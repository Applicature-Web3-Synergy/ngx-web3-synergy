import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, Subject, Subscriber, switchMap, tap } from 'rxjs';

import Web3 from 'web3';
import Onboard from 'bnc-onboard';
import { API, Initialization, Subscriptions, Wallet } from 'bnc-onboard/dist/src/interfaces';

import { AUC_ETH_EVENTS, AUC_ETH_METHODS, AUC_METAMASK_CODES } from '../../enums';
import {
  AucEthChainParams,
  AucNetworkOption,
  AucConnectInfo,
  AucEthereum,
  AucProviderMessage,
  AucProviderRpcError
} from '../../interfaces';
import { AucConnectionState } from './interfaces';
import { aucConvertChainIdToHex, aucGetChainParams } from '../../helpers';
import { AucBlockExplorerApiUrl, AucBlockExplorerUrls } from '../../constants';

const AUC_CONNECTED_WALLET_NAME = 'AUC_CONNECTED_WALLET_NAME';


@Injectable()
export class AucWalletConnectService {
  /** @returns current {@link Web3} instance. */
  public get web3(): Web3 {
    return this._web3;
  }

  /**
   * This library uses {@link Onboard} for connecting wallet. <br>
   * @returns current {@link Onboard} instance.
   */
  public get onboard(): API {
    return this._onboard;
  };

  /** @returns current connection state. */
  public get connectionState(): AucConnectionState {
    if (!this._onboard) {
      return { connected: false };
    }

    const state = this._onboard.getState();

    return {
      connected: !!state.address,
      state
    }
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
   * Emits when connect event. Emits from Metamask {@link AUC_ETH_EVENTS.CONNECT} event. <br>
   * You can subscribe on it.
   */
  public get connectChanged$(): Observable<AucConnectInfo> {
    return this._connectChanged$.asObservable();
  }

  /**
   * Emits when disconnect event. Emits from Metamask {@link AUC_ETH_EVENTS.DISCONNECT} event. <br>
   * You can subscribe on it.
   */
  public get disconnectChanged$(): Observable<AucProviderRpcError> {
    return this._disconnectChanged$.asObservable();
  }

  /**
   * Emits when message events. Emits from Metamask {@link AUC_ETH_EVENTS.MESSAGE} event. <br>
   * You can subscribe on it.
   */
  public get messageChanged$(): Observable<AucProviderMessage> {
    return this._messageChanged$.asObservable();
  }

  /**
   * Emits when network was changed. <br>
   * You can subscribe on it.
   */
  public get networkChanged$(): Observable<number | null> {
    return this._networkChanged$.asObservable();
  }

  /**
   * Emits when balance was changed. <br>
   * You can subscribe on it.
   */
  public get balanceChanged$(): Observable<string | null> {
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
    this._chainChanged$.next(chainId);
    this.selectedNetwork = chainId;
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
  private _onboard: API;

  /** @internal */
  private _web3: Web3;

  /** @internal */
  private _accountsChanged$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /** @internal */
  private _chainChanged$: BehaviorSubject<string | null> = new BehaviorSubject<string>(null);

  /** @internal */
  private _networkChanged$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  /** @internal */
  private _balanceChanged$: BehaviorSubject<string | null> = new BehaviorSubject<string>(null);

  /** @internal */
  private _connectChanged$: Subject<AucConnectInfo> = new Subject<AucConnectInfo>();

  /** @internal */
  private _cantFindAddingNetwork$: Subject<void> = new Subject<void>();

  /** @internal */
  private _disconnectChanged$: Subject<AucProviderRpcError> = new Subject<AucProviderRpcError>();

  /** @internal */
  private _messageChanged$: Subject<AucProviderMessage> = new Subject<AucProviderMessage>();

  /** @internal */
  private _selectedNetwork$: Subject<AucNetworkOption> = new BehaviorSubject<AucNetworkOption>(null);

  /** @internal */
  private _supportedNetworks: AucNetworkOption[];

  /**
   * This library uses {@link Onboard} for initialization wallet connection. <br>
   * More information about config {@link https://www.npmjs.com/package/bnc-onboard}. <br>
   * @param config - Initialization Config for wallet connection.
   * @param supportedNetworks - List of the supported networks.
   */
  public initialize(config: Omit<Initialization, 'subscriptions' | 'darkMode' | 'hideBranding'>,
                    supportedNetworks: AucNetworkOption[]
  ): Observable<void> {
    if (this._onboard) {
      console.error('bnc-onboard already initialized');

      return of(null);
    }

    if (supportedNetworks && Array.isArray(supportedNetworks)) {
      this.supportedNetworks = supportedNetworks;
    } else {
      console.error('Invalid supported Networks. Please set supportedNetworks as AucNetworkOption[]');
    }

    return new Observable<void>((observer: Subscriber<void>) => {
      this._onboard = Onboard({
        ...config,
        walletSelect: {
          ...config.walletSelect,
          heading: 'Connect a wallet',
          description: '',
        },
        subscriptions: this._getSubscriptions<void>(observer),
        hideBranding: true,
      });

      const previouslySelectedWallet = localStorage.getItem(AUC_CONNECTED_WALLET_NAME);

      if (previouslySelectedWallet !== null) {
        this._onboard.walletSelect(previouslySelectedWallet)
          .then(() => {
            observer.next();
            observer.complete();
          })
          .catch(error => observer.error(error));

        return;
      }

      this._initWeb3(observer);
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

      connection$ = this.disconnectWallet()
    }

    return connection$
      .pipe(
        switchMap(() => from(this._onboard.walletSelect())),
        map(() => this.connectionState)
      );
  }

  /** Disconnect wallet */
  public disconnectWallet(): Observable<void> {
    return of(this._onboard ? this._onboard.walletReset() : null)
      .pipe(
        tap(() => {
          localStorage.removeItem(AUC_CONNECTED_WALLET_NAME);
        })
      )
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
  private _getSubscriptions<T = any>(observer: Subscriber<T>): Subscriptions {
    let selectedWallet: Wallet;

    return {
      address: (address: string): void => {
        this._accountsChanged$.next(address ? [ address ] : []);

        this._initWeb3<T>(observer, selectedWallet);
      },
      network: (networkId: number): void => {
        this._onboard.config({ networkId });

        this.chainId = aucConvertChainIdToHex(networkId)
        this._networkChanged$.next(networkId);
      },
      wallet: (wallet: Wallet): void => {
        selectedWallet = wallet;

        this._initWeb3<T>(observer, selectedWallet);
      },
      balance: (balance: string): void => {
        this._balanceChanged$.next(balance);
      },
    };
  }

  /** @internal */
  private _initWeb3<T = any>(observer: Subscriber<T>, selectedWallet?: Wallet): void {
    try {
      const provider = Object.assign({}, selectedWallet?.provider || {});

      if (!provider?.selectedAddress || !selectedWallet?.name) {
        this._web3 = new Web3();
      } else {
        localStorage.setItem(AUC_CONNECTED_WALLET_NAME, selectedWallet.name);

        this._web3 = new Web3(selectedWallet.provider);
      }

      this._handleEthEvents();

      observer.next();
      observer.complete();
    } catch (e) {
      observer.error(e);
    }
  }

  /** @internal */
  private _handleEthEvents(): void {
    const eth = (window as any).ethereum as AucEthereum;

    if (!eth) {
      return;
    }

    eth.on(AUC_ETH_EVENTS.CHAIN_CHANGED, (chainId: string) => {
      /**
       *  It's recommended to reload the page on chain changes, unless you have good reason not to. <br>
       *  You can use window.location.reload()
       */
      this.chainId = chainId;
    });

    eth.on(AUC_ETH_EVENTS.CONNECT, (connectInfo: AucConnectInfo) => {
      this._connectChanged$.next(connectInfo);
    });

    eth.on(AUC_ETH_EVENTS.DISCONNECT, (error: AucProviderRpcError) => {
      this._disconnectChanged$.next(error);
    });

    eth.on(AUC_ETH_EVENTS.MESSAGE, (message: AucProviderMessage) => {
      this._messageChanged$.next(message);
    });
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
