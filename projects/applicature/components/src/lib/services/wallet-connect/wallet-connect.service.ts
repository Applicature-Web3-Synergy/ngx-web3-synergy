import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subscriber } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import Web3 from 'web3';
import Onboard from '@web3-onboard/core'
import { EIP1193Provider } from '@web3-onboard/common';
import { Chain } from '@web3-onboard/common/dist/types';
import {
  Account,
  AppState,
  Balances,
  InitOptions,
  OnboardAPI,
  WalletState
} from '@web3-onboard/core/dist/types';

import { AucConnectionState, AucInitOptions, BlockExplorerUrlsByChainId } from './interfaces';
import { BaseSubscriber } from '../../helpers';

const AUC_CONNECTED_WALLET_NAME = 'AUC_CONNECTED_WALLET_NAME';


export interface AucChain extends Chain {
  /** Ex: https://etherscan.io. <br>
   * You can use {@link AucBlockExplorerUrls[chainId][0]} or set other url.
   * */
  blockExplorerUrl: string;
  /** Ex: https://api.etherscan.io/api. <br>
   * Used for getting transactions information.
   * You can use {@link AucBlockExplorerUrls[chainId]} or set other url.
   * */
  blockExplorerApiUrl?: string;
}

@Injectable()
export class AucWalletConnectService extends BaseSubscriber {
  /** @returns current {@link Web3} instance. */
  public get web3(): Web3 {
    return this._web3;
  }

  /**
   * This library uses {@link Onboard} for connecting wallet. <br>
   * @returns current {@link Onboard} instance.
   */
  public get onboard(): OnboardAPI {
    return this._onboard;
  };

  /** @returns Blockchain explorer urls config. */
  get blockExplorerUrlByChainId(): BlockExplorerUrlsByChainId {
    return this._blockExplorerUrlByChainId;
  }

  /** @returns current connection state. */
  public get connectionState(): AucConnectionState {
    if (!this._onboard) {
      return { connected: false };
    }

    const state = this._onboard.state.get();

    return {
      connected: !!state.wallets?.length,
      state
    }
  }

  /** @returns current connection state as Observable */
  public get connectionState$(): Observable<AucConnectionState> {
    return (!this._onboard
        ? of(null)
        : this._onboard.state.select()
    )
      .pipe(
        map((state: AppState | null) => {
          if (!state) {
            return { connected: false };
          }

          return {
            connected: !!state?.wallets?.length,
            state
          }
        })
      );
  }

  /**
   * Emits when account was changed. <br>
   * You can subscribe on it.
   */
  public get accountsChanged$(): Observable<string[]> {
    return this._accountsChanged$.asObservable();
  }

  /**
   * Emits when chain was changed. <br>
   * You can subscribe on it.
   */
  public get chainChanged$(): Observable<string | null> {
    return this._chainChanged$.asObservable();
  }

  /**
   * Emits when balance was changed. <br>
   * You can subscribe on it.
   */
  public get balanceChanged$(): Observable<Balances> {
    return this._balanceChanged$.asObservable();
  }

  /**
   * Sets selected chainId and selected network.
   * @param chainId - 0x-prefixed hexadecimal string.
   */
  private set chainId(chainId: string) {
    if (this._chainChanged$.value !== chainId) {
      this._chainChanged$.next(chainId);
    }
  }

  /** @internal */
  private _onboard: OnboardAPI;

  /** @internal */
  private get _shadowRoot(): ShadowRoot | null {
    return document.querySelector('onboard-v2')?.shadowRoot
  }

  /** @internal */
  private _web3: Web3;

  /** @internal */
  private _accountsChanged$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /** @internal */
  private _chainChanged$: BehaviorSubject<string | null> = new BehaviorSubject<string>(null);

  /** @internal */
  private _balanceChanged$: BehaviorSubject<Balances | null> = new BehaviorSubject<Balances>(null);

  /** @internal */
  private _blockExplorerUrlByChainId: BlockExplorerUrlsByChainId = {};

  constructor() {
    super();
  }

  /**
   * This library uses {@link Onboard} for initialization wallet connection. <br>
   * More information about config {@link https://docs.blocknative.com/onboard/core}. <br>
   * @param config - Initialization Config for wallet connection.
   */
  public initialize(config: AucInitOptions): Observable<void> {
    if (this._onboard) {
      console.error('web3-onboard already initialized');

      return of(null);
    }

    return new Observable<void>((observer: Subscriber<void>) => {
      try {
        const chains: Chain[] = config.chains.map(({
                                                     id,
                                                     rpcUrl,
                                                     label,
                                                     token,
                                                     namespace,
                                                     color,
                                                     icon,
                                                     blockExplorerUrl,
                                                     blockExplorerApiUrl
                                                   }: AucChain) => {
          const chain: Chain = {
            id,
            rpcUrl,
            label,
            token,
          };

          if (namespace) {
            chain.namespace = namespace;
          }

          if (color) {
            chain.color = color;
          }

          if (icon) {
            chain.icon = icon;
          }

          this._blockExplorerUrlByChainId[id] = {
            blockExplorerUrl,
            blockExplorerApiUrl
          }

          return chain;
        });

        const initOptions: InitOptions = {
          wallets: config.wallets,
          chains: chains,
          accountCenter: config.accountCenter ?? { desktop: { enabled: false } }
        }

        if (config.appMetadata) {
          initOptions.appMetadata = config.appMetadata;
        }

        if (config.i18n) {
          initOptions.i18n = config.i18n;
        }

        this._onboard = Onboard(initOptions);

        this._setStyles();
        this._subscriptions();

        const previouslyConnectedWallet = localStorage.getItem(AUC_CONNECTED_WALLET_NAME);

        if (previouslyConnectedWallet !== null) {
          this._onboard.connectWallet({ autoSelect: { label: previouslyConnectedWallet, disableModals: true } })
            .then(() => {
              observer.next();
              observer.complete();
            })
            .catch(error => observer.error(error));

          return;
        }

        this._initWeb3();

        observer.next();
        observer.complete();
      } catch (e) {
        observer.error(e);
      }
    });
  }

  /**
   * Connect Wallet. <br>
   * @param isDisconnect - If wallet already connected, will disconnect wallet if true and connect wallet again.
   * @return Current connection state.
   */
  public connectWallet(isDisconnect: boolean = false): Observable<AucConnectionState> {
    if (!this._onboard) {
      return of({ connected: false })
        .pipe(
          tap(() => new Error('initialize method must be called'))
        );
    }

    let connection$: Observable<void> = of(null);

    if (this.connectionState.connected) {
      if (!isDisconnect) {
        return of(this.connectionState);
      }

      connection$ = this.disconnectWallet();
    }

    return connection$
      .pipe(
        switchMap(() => {
          const connection = this._onboard.connectWallet();
          setTimeout(() => {
            const header = this._shadowRoot?.querySelector('.header-heading');

            if (header) {
              header.innerHTML = 'Connect a wallet';
            }
          });

          return from(connection);
        }),
        map(() => this.connectionState)
      );
  }

  /** Disconnect wallet. */
  public disconnectWallet(): Observable<void> {
    const [ primaryWallet ] = this._onboard?.state?.get()?.wallets;

    return of(primaryWallet ? this._onboard.disconnectWallet({ label: primaryWallet.label }) : null)
      .pipe(
        map(() => null),
        tap(() => {
          localStorage.removeItem(AUC_CONNECTED_WALLET_NAME);
        })
      );
  }

  /** @internal */
  private _subscriptions(): void {
    this.onboard.state.select('wallets')
      .pipe(
        map((wallets: WalletState[]) => (wallets || [])[0]),
        takeUntil(this.notifier)
      )
      .subscribe((wallet: WalletState) => {
        this._initWeb3(wallet?.provider);

        if (wallet) {
          const connectedWallet = wallet.label;

          window.localStorage.setItem(
            AUC_CONNECTED_WALLET_NAME,
            connectedWallet
          );
        }

        const account: Account = (wallet?.accounts ?? [])[0];

        if (!account) {
          this._accountsChanged$.next([]);
          this._balanceChanged$.next(null);
          this.chainId = null;
        } else {
          const address: string = account.address;
          const balance: Balances | null = account.balance;

          this.chainId = (wallet.chains ?? [])[0]?.id;

          if ((this._accountsChanged$.value ?? [])[0] !== address) {
            this._accountsChanged$.next([ address ]);
          }

          if (this._balanceChanged$.value !== balance) {
            this._balanceChanged$.next(balance);
          }
        }
      });
  }

  /** @internal */
  private _setStyles(): void {
    try {
      const shadowRoot = this._shadowRoot;

      if (!shadowRoot) {
        return;
      }

      const sheet: CSSStyleSheet = new CSSStyleSheet;
      const styles = `
        .sidebar,
        .scroll-container .spacer,
         .connecting-container .flex .flex > div:not(:last-child)  {
          display: none;
        }
        .header { border-radius: 0 !important; }
        .header-heading { line-height: 20px !important; }
        .button-container { transform: translateY(-2px) }
        .close-button { padding: 0 !important; }
        .close-button:hover { color: #BBC7D9 !important; transition: color 0.25s}
        .wallet-button-styling { padding: 11px 15px; transition: all 0.25s; font-weight: 500;}
        .wallet-button-styling:hover { border-width: 2px; padding: 10px 14px;}
        .wallet-button-styling:focus { background-color: #DDE3EC; }
        .wallet-button-styling > div,
        .connecting-container .flex .flex > div:last-child > div {
            height: 32px !important;
            width: 32px !important;
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
        }
        .connecting-container .flex .flex > div:last-child,
        .connecting-container .flex  > .text {
          right: 0 !important;
        }
        .connecting-container .flex  > .text { padding-left: 12px }
        .wallet-button-styling > span { margin-left: 12px !important; }
        .connecting-container { padding: 11px 15px !important; font-weight: 500; border-radius: 8px !important; }
        .container .onboard-button-primary { position: initial; padding: 10px; margin-top: 15px }
        button { border-radius: 8px; }
        .container { min-height: 136px; max-height: 80vh }
      `;

      sheet['replaceSync'](styles);
      shadowRoot['adoptedStyleSheets'] = [ sheet ];
    } catch {

    }
  }

  /** @internal */
  private _initWeb3<T = any>(provider?: EIP1193Provider): void {
    if (!provider) {
      this._web3 = new Web3();
    } else {
      this._web3 = new Web3(provider as any);
    }
  }
}
