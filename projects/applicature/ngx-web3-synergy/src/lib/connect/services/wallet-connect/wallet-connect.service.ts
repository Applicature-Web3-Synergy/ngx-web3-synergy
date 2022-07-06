import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject, Subscriber, take } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import Web3 from 'web3';
import Onboard from '@web3-onboard/core';
import { Chain } from '@web3-onboard/common/dist/types';
import {
  Account,
  AppState,
  Balances,
  InitOptions,
  OnboardAPI,
  WalletState
} from '@web3-onboard/core/dist/types';

import {
  AucChain,
  AucConnectionState,
  AucInitOptions,
  AucWalletConfig,
  AucWalletConfigMap,
  AucWalletsToInitLabel,
  BlockExplorerUrlsByChainId
} from './interfaces';
import { AucBlockScrollHelperService, BaseSubscriber } from '../../../helpers';
import { AucDialogConfig, AucDialogService } from '../../../dialog';
import { AucWalletLabel } from './types';
import { AucConnectDialogConfig, AucConnectDialogData, AucConnectModalComponent } from '../../components';


const AUC_CONNECTED_WALLET_NAME = 'AUC_CONNECTED_WALLET_NAME';


@Injectable()
export class AucWalletConnectService extends BaseSubscriber {
  /**
   * @internal
   * Emits when Onboard was successfully initialized.
   * */
  private _onboardInitialized$: Subject<void> = new Subject<void>();

  /** @returns initialization config. */
  public get initializationConfig(): AucInitOptions {
    return this._initializationConfig;
  }

  /** @returns wallets Map from initialization config. */
  public get initializedWalletsMap(): Map<AucWalletsToInitLabel, AucWalletConfigMap> {
    return this._initializedWalletsMap;
  }

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
  }

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
    };
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

          const connected = !!state?.wallets?.length;

          if (!connected) {
            localStorage.removeItem(AUC_CONNECTED_WALLET_NAME);
          }

          return {
            connected,
            state
          };
        })
      );
  }

  /**
   * Emits when account was changed. <br>
   * You can subscribe on it.
   */
  public get accounts$(): Observable<string[]> {
    return this._accounts$.asObservable();
  }

  /**
   * Emits when chain was changed. <br>
   * You can subscribe on it.
   */
  public get chain$(): Observable<string | null> {
    return this._chain$.asObservable();
  }

  /**
   * Emits when balance was changed. <br>
   * You can subscribe on it.
   */
  public get balance$(): Observable<Balances> {
    return this._balance$.asObservable();
  }

  /**
   * Sets selected chainId and selected network.
   * @param chainId - 0x-prefixed hexadecimal string.
   */
  private set chainId(chainId: string) {
    if (this._chain$.value !== chainId) {
      this._chain$.next(chainId);
    }
  }

  /** @internal */
  private _initializationConfig: AucInitOptions;

  /** @internal */
  private _initializedWalletsMap: Map<AucWalletsToInitLabel, AucWalletConfigMap> =
    new Map<AucWalletsToInitLabel, AucWalletConfigMap>();

  /** @internal */
  private _onboard: OnboardAPI;

  /** @internal */
  private _web3: Web3;

  /** @internal */
  private _accounts$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /** @internal */
  private _chain$: BehaviorSubject<string | null> = new BehaviorSubject<string>(null);

  /** @internal */
  private _balance$: BehaviorSubject<Balances | null> = new BehaviorSubject<Balances>(null);

  /** @internal */
  private _blockExplorerUrlByChainId: BlockExplorerUrlsByChainId = {};

  constructor(private _aucBlockScrollHelperService: AucBlockScrollHelperService,
              private _dialogService: AucDialogService) {
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

    if (!config.wallets || !config.wallets.length) {
      console.error('Minimum 1 wallets should be set. Please set wallets to config!');

      return of(null);
    }

    this._initializationConfig = config;
    config.wallets.forEach((wallet: AucWalletConfig, index: number) =>
      this._initializedWalletsMap.set(wallet.label, { ...wallet, position: index }));

    const chains: Chain[] = (config?.chains ?? []).map(({
                                                          id,
                                                          rpcUrl,
                                                          label,
                                                          token,
                                                          namespace,
                                                          color,
                                                          icon,
                                                          providerConnectionInfo,
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

      if (providerConnectionInfo?.url) {
        chain.providerConnectionInfo = providerConnectionInfo;
      }

      this._blockExplorerUrlByChainId[id] = {
        blockExplorerUrl,
        blockExplorerApiUrl
      };

      return chain;
    });

    const initOptions: InitOptions = {
      wallets: config.wallets.map(item => item.module),
      chains,
      accountCenter: { desktop: { enabled: false }, mobile: { enabled: false } }
    };

    return new Observable<void>((observer: Subscriber<void>) => {
      try {
        this._onboard = Onboard(initOptions);

        this._subscriptions();
        this.initWeb3();
        this._onboardInitialized$.next();

        observer.next();
        observer.complete();
      } catch (e) {
        observer.error(e);
      }
    });
  }

  public connect(dialogConfig?: AucDialogConfig<AucConnectDialogConfig>): Observable<AucConnectionState> {
    if (!this._onboard) {
      return of({ connected: false })
        .pipe(
          tap(() => new Error('initialize method must be called'))
        );
    }

    this._aucBlockScrollHelperService.lockScroll();

    const config: AucDialogConfig<AucConnectDialogData> = {
      data: {
        title: 'Connect a wallet',
        service: this
      },
      width: '400px',
      dialogClass: 'auc-connect-dialog',
      overlay: {
        hasOverlay: true,
        closeByClick: false,
        overlayClass: [ 'auc-connect-dialog-overlay' ],
      }
    };

    const ref = this._dialogService.open<AucConnectModalComponent, AucConnectDialogData, AucWalletLabel | null>(
      AucConnectModalComponent,
      dialogConfig
        ? {
          ...dialogConfig,
          data: {
            ...dialogConfig.data,
            service: this
          }
        }
        : config
    );

    return ref.afterClosed
      .pipe(
        switchMap((label: AucWalletLabel | null) => !label
          ? of(this.connectionState)
          : this.connectWallet(label)
        )
      );
  }

  /**
   * Connect Wallet. <br>
   * @param label - Wallets label to connect.
   * @return Current connection state.
   */
  public connectWallet(label: AucWalletLabel): Observable<AucConnectionState> {
    if (!this._onboard) {
      return of({ connected: false })
        .pipe(
          tap(() => new Error('initialize method must be called'))
        );
    }

    if (!label) {
      return of(this.connectionState)
        .pipe(tap(() => new Error('label is required parameter')));
    }


    return new Observable<WalletState[]>(observer => {
      this.onboard.connectWallet({ autoSelect: { label, disableModals: true } })
        .then((connection: WalletState[]) => {
          observer.next(connection);
          observer.complete();
        })
        .catch(error => observer.error(error));
    })
      .pipe(
        map((states: WalletState[]) => states ?? []),
        switchMap((states: WalletState[]) => {
          const connectedWallet: WalletState = states.find((state: WalletState) => state.label === label);

          if (!connectedWallet || states.length === 1) {
            return of(states);
          }

          return combineLatest(
            states
              .filter((state: WalletState) => state.label !== label)
              .map((state: WalletState) => this.disconnectWallet(state.label as AucWalletLabel))
          )
            .pipe(
              map(() => [ connectedWallet ])
            );
        }),
        map(() => this.connectionState)
      );
  }

  /** Disconnect wallet. */
  public disconnectWallet(label?: AucWalletLabel): Observable<void> {
    const [ primaryWallet ] = this._onboard?.state?.get()?.wallets;

    return of(
      primaryWallet || label
        ? this._onboard.disconnectWallet({ label: label ? label : primaryWallet.label })
        : null
    )
      .pipe(
        tap(() => {
          localStorage.removeItem(AUC_CONNECTED_WALLET_NAME);
        }),
        map(() => null),
      );
  }

  /** @internal */
  private _subscriptions(): void {
    this._onboardInitialized$
      .pipe(take(1))
      .subscribe(() => {
        const previouslyConnectedWallet = localStorage.getItem(AUC_CONNECTED_WALLET_NAME);

        if (previouslyConnectedWallet !== null) {
          this._onboard.connectWallet({
            autoSelect: {
              label: previouslyConnectedWallet, disableModals: true
            }
          }).then();
        }
      });

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
        } else {
          localStorage.removeItem(AUC_CONNECTED_WALLET_NAME);
        }

        const account: Account = (wallet?.accounts ?? [])[0];

        if (!account) {
          this._accounts$.next([]);
          this._balance$.next(null);
          this.chainId = null;
        } else {
          const address: string = account.address;
          const balance: Balances | null = account.balance;

          this.chainId = (wallet.chains ?? [])[0]?.id;

          if ((this._accounts$.value ?? [])[0] !== address) {
            this._accounts$.next([ address ]);
          }

          if (this._balance$.value !== balance) {
            this._balance$.next(balance);
          }
        }
      });
  }

  /** Init web3 instance */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public initWeb3<T = any>(provider?: T): Web3 {
    if (!provider) {
      this._web3 = new Web3();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._web3 = new Web3(provider as any);
    }

    return this._web3;
  }
}
