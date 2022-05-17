import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject, Subscriber } from 'rxjs';
import { catchError, debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import Web3 from 'web3';
import Onboard from '@web3-onboard/core'
import { EIP1193Provider } from '@web3-onboard/common';
import {
  Account,
  AppState,
  Balances,
  InitOptions,
  OnboardAPI,
  WalletState
} from '@web3-onboard/core/dist/types'

import { AUC_ETH_METHODS, AUC_METAMASK_CODES } from '../../enums';
import {
  AucEthChainParams,
  AucNetworkOption,
  AucEthereum,
} from '../../interfaces';
import { AucConnectionState } from './interfaces';
import { aucConvertChainIdToHex, aucGetChainParams, BaseSubscriber } from '../../helpers';
import { AucBlockExplorerApiUrl, AucBlockExplorerUrls } from '../../constants';

const AUC_CONNECTED_WALLET_NAME = 'AUC_CONNECTED_WALLET_NAME';


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
        debounceTime(300),
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
   * Emits when selected network. <br>
   * You can subscribe on it.
   */
  public get selectedNetwork$(): Observable<AucNetworkOption> {
    return this._selectedNetwork$.asObservable();
  }

  /** @returns Supported networks list. */
  public get supportedNetworks(): AucNetworkOption[] {
    if (!this._supportedNetworks || !this._supportedNetworks.length) {
      console.error(`You don't have any supported networks. Pls set it when initialize library`);
    }

    return this._supportedNetworks ?? [];
  }

  /** Sets supported networks list. */
  public set supportedNetworks(options: AucNetworkOption[]) {
    this._supportedNetworks = options ?? [];
    this._supportedNetworks.forEach((item: AucNetworkOption) => {
      if (!item.chainId) {
        return;
      }

      if (item.blockExplorerApiUrl) {
        AucBlockExplorerApiUrl[item.chainId] = item.blockExplorerApiUrl;
      }

      if (!item.blockExplorerUrl) {
        return;
      }

      AucBlockExplorerUrls[item.chainId] = [
        ...new Set([
          item.blockExplorerUrl,
          ...(AucBlockExplorerUrls[item.chainId] || [])
        ])
      ];
    });

    this.selectedNetwork = this._chainChanged$.value;
  }

  /**
   * Emits when adding new network and config doesn't exist. <br>
   * You can subscribe on it and show some message to user.
   */
  public get cantFindAddingNetwork$(): Observable<void> {
    return this._cantFindAddingNetwork$.asObservable();
  }

  /**
   * Sets selected chainId and selected network.
   * @param chainId - 0x-prefixed hexadecimal string.
   */
  private set chainId(chainId: string) {
    if (this._chainChanged$.value !== chainId) {
      this._chainChanged$.next(chainId);
      this.selectedNetwork = chainId;
    }
  }

  /**
   * @internal <br>
   * Sets selected network by chainId. <br>
   * @param chainId - 0x-prefixed hexadecimal string.
   */
  private set selectedNetwork(chainId: string) {
    if (!chainId) {
      this._selectedNetwork$.next(null);
    }

    let isSameSelected: boolean = false;

    this._supportedNetworks = this.supportedNetworks
      .map((option: AucNetworkOption) => {
        if (option.isActive && option.chainId === chainId) {
          isSameSelected = true;
        }

        return { ...option, isActive: option.chainId === chainId };
      });

    if (isSameSelected) {
      return;
    }

    const active = this.supportedNetworks.find((option: AucNetworkOption) => option.isActive);

    this._selectedNetwork$.next(active);
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
  private _cantFindAddingNetwork$: Subject<void> = new Subject<void>();

  /** @internal */
  private _selectedNetwork$: Subject<AucNetworkOption> = new BehaviorSubject<AucNetworkOption>(null);

  /** @internal */
  private _supportedNetworks: AucNetworkOption[];

  constructor() {
    super();
  }

  /**
   * This library uses {@link Onboard} for initialization wallet connection. <br>
   * More information about config {@link https://www.npmjs.com/package/bnc-onboard}. <br>
   * @param config - Initialization Config for wallet connection.
   * @param supportedNetworks - List of the supported networks.
   */
  public initialize(config: InitOptions, supportedNetworks: AucNetworkOption[]): Observable<void> {
    if (this._onboard) {
      console.error('web3-onboard already initialized');

      return of(null);
    }

    if (supportedNetworks && Array.isArray(supportedNetworks)) {
      this.supportedNetworks = supportedNetworks; // TODO need to think about it
    } else {
      console.error('Invalid supported Networks. Please set supportedNetworks as AucNetworkOption[]');
    }


    return new Observable<void>((observer: Subscriber<void>) => {
      try {
        this._onboard = Onboard({
          accountCenter: {
            desktop: {
              enabled: false
            }
          },
          ...config,
        });

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

  /**
   * This method is used for switching Metamask network by {@link chainId}. <br>
   * If Metamask doesn't have this {@link chainId} it can be added by parameter {@link chainParams}. <br>
   * @param chainId - 0x-prefixed hexadecimal string. You can use helper {@link aucConvertChainIdToHex}.
   * @param chainParams - An optional parameter. <br>
   * Uses for adding new network to Metamask if it doesn't include network by {@link chainId}. <br>
   * This Library already have {@link chainParams} for the next chainIds {@link AUC_CHAIN_ID}. <br>
   * You can use your own specific params.
   */
  public switchEthereumChain(chainId: string, chainParams?: AucEthChainParams): Observable<boolean> {
    if (!chainId) {
      return of(false);
    }

    return this._request<void>(AUC_ETH_METHODS.SWITCH_ETHEREUM_CHAIN, [ { chainId } ])
      .pipe(
        map(() => true),
        catchError(err => {
          if (err?.code === AUC_METAMASK_CODES.UNRECOGNIZED_CHAIN_ID) {
            return this.addEthereumChain(chainParams ?? aucGetChainParams(chainId))
          }

          return of(false);
        })
      );
  }

  /**
   * This method is used for adding new network to Metamask by {@link chainParams}.
   * @param chainParams - Uses for adding new network to Metamask.<br>
   * This Library already have {@link chainParams} for the next chainIds {@link AUC_CHAIN_ID}.<br>
   * You can get it uses method {@link aucGetChainParams}.
   */
  public addEthereumChain(chainParams: Partial<AucEthChainParams>): Observable<boolean> {
    if (!chainParams) {
      this._cantFindAddingNetwork$.next();
      return of(false);
    }

    return this._request<void>(AUC_ETH_METHODS.ADD_ETHEREUM_CHAIN, [ chainParams ])
      .pipe(
        map(() => true),
        catchError(() => of(false))
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
        .scroll-container .space,
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

  /** @internal */
  private _request<T = any>(
    method: AUC_ETH_METHODS,
    params?: unknown[] | Record<string, unknown>,
  ): Observable<T> {
    const eth = (window as any).ethereum as AucEthereum;

    return from(eth.request({ method, params }));
  }
}
