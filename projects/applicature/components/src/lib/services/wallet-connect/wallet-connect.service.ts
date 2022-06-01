import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscriber } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import Web3 from 'web3';
import Onboard from '@web3-onboard/core'
import { Chain } from '@web3-onboard/common/dist/types';
import {
  Account,
  AppState,
  Balances,
  InitOptions,
  OnboardAPI,
  WalletState
} from '@web3-onboard/core/dist/types';

import { AucChain, AucConnectionState, AucInitOptions, BlockExplorerUrlsByChainId } from './interfaces';
import { BaseSubscriber } from '../../helpers';

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

    if (!config) {
      console.error('Please set config!');

      return of(null);
    }

    const chains: Chain[] = (config?.chains ?? []).map(({
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
      chains,
      accountCenter: config.accountCenter ?? { desktop: { enabled: false }, mobile: { enabled: false } }
    }

    if (config.appMetadata) {
      initOptions.appMetadata = config.appMetadata;
    }

    if (config.i18n) {
      initOptions.i18n = config.i18n;
    }

    return new Observable<void>((observer: Subscriber<void>) => {
      try {
        this._onboard = Onboard(initOptions);

        // this._setStyles();
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

        this.initWeb3();

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
          return new Observable<WalletState[]>(observer => {
            this._onboard.connectWallet()
              .then((connection: WalletState[]) => {
                observer.next(connection);
                observer.complete();
              })
              .catch(error => observer.error(error));
          });
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
        this.initWeb3(wallet?.provider);

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

  /** Init web3 instance */
  public initWeb3<T = any>(provider?: T): Web3 {
    if (!provider) {
      this._web3 = new Web3();
    } else {
      this._web3 = new Web3(provider as any);
    }

    return this._web3;
  }
}
