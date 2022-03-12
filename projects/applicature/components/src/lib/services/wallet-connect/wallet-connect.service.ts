import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, Subject, Subscriber, tap } from 'rxjs';

import Web3 from 'web3';
import Onboard from 'bnc-onboard';
import { API, Initialization, Subscriptions, Wallet } from 'bnc-onboard/dist/src/interfaces';

import { EthEvents, EthMethods } from '../../enums';
import { ConnectInfo, EthChainParams, Ethereum, ProviderMessage, ProviderRpcError } from '../../interfaces';
import { ConnectionState } from './interfaces';

const APPLICATURE_CONNECTED_WALLET_NAME = 'APPLICATURE_CONNECTED_WALLET_NAME';


@Injectable()
export class WalletConnectService {
  public get web3(): Web3 {
    return this._web3;
  }

  public get onboard(): API {
    return this._onboard;
  };

  public get connectionState(): ConnectionState {
    if (!this._onboard) {
      return { connected: false };
    }

    const state = this._onboard.getState();

    return {
      connected: !!state.address,
      state
    }
  }

  public get accountsChanged$(): Observable<string[]> {
    return this._accountsChanged$.asObservable();
  }

  public get chainChanged$(): Observable<string | null> {
    return this._chainChanged$.asObservable();
  }

  public get connectChanged$(): Observable<ConnectInfo> {
    return this._connectChanged$.asObservable();
  }

  public get disconnectChanged$(): Observable<ProviderRpcError> {
    return this._disconnectChanged$.asObservable();
  }

  public get messageChanged$(): Observable<ProviderMessage> {
    return this._messageChanged$.asObservable();
  }

  public get networkChanged$(): Observable<number | null> {
    return this._networkChanged$.asObservable();
  }

  public get balanceChanged$(): Observable<string | null> {
    return this._balanceChanged$.asObservable();
  }

  private _onboard: API;
  private _web3: Web3;
  private _accountsChanged$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _chainChanged$: BehaviorSubject<string | null> = new BehaviorSubject<string>(null);
  private _networkChanged$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private _balanceChanged$: BehaviorSubject<string | null> = new BehaviorSubject<string>(null);
  private _connectChanged$: Subject<ConnectInfo> = new Subject<ConnectInfo>();
  private _disconnectChanged$: Subject<ProviderRpcError> = new Subject<ProviderRpcError>();
  private _messageChanged$: Subject<ProviderMessage> = new Subject<ProviderMessage>();

  constructor() {
  }

  public initialize(config: Omit<Initialization, 'subscriptions' | 'darkMode' | 'hideBranding'>): Observable<void> {
    if (this._onboard) {
      console.error('bnc-onboard is not initialized');

      return of(null);
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

      const previouslySelectedWallet = localStorage.getItem(APPLICATURE_CONNECTED_WALLET_NAME);

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

  public connectWallet(): Observable<ConnectionState> {
    if (!this._onboard) {
      return of({ connected: false })
        .pipe(
          tap(() => new Error('initialize method must be called'))
        );
    }

    if (this.connectionState.connected) {
      return of(this.connectionState);
    }

    return from(this._onboard.walletSelect())
      .pipe(
        map(() => this.connectionState)
      );
  }

  public disconnectWallet(): Observable<void> {
    return of(this._onboard ? this._onboard.walletReset() : null)
      .pipe(
        tap(() => {
          localStorage.removeItem(APPLICATURE_CONNECTED_WALLET_NAME);
        })
      )
  }

  public switchEthereumChain(chainId: string): Observable<boolean> {
    return this._request<void>(EthMethods.SwitchEthereumChain, [ { chainId } ])
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  public addEthereumChain(params: Partial<EthChainParams>): Observable<boolean> {
    return this._request<void>(EthMethods.AddEthereumChain, [ params ])
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  private _getSubscriptions<T = any>(observer: Subscriber<T>): Subscriptions {
    let selectedWallet: Wallet;

    return {
      address: (address: string): void => {
        this._accountsChanged$.next(address ? [ address ] : []);

        this._initWeb3<T>(observer, selectedWallet);
      },
      network: (networkId: number): void => {
        this._onboard.config({ networkId });

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

  private _initWeb3<T = any>(observer: Subscriber<T>, selectedWallet?: Wallet): void {
    try {
      const provider = Object.assign({}, selectedWallet?.provider || {});

      if (!provider?.selectedAddress || !selectedWallet?.name) {
        this._web3 = new Web3();
      } else {
        localStorage.setItem(APPLICATURE_CONNECTED_WALLET_NAME, selectedWallet.name);

        this._web3 = new Web3(selectedWallet.provider);
      }

      this._handleEthEvents();

      observer.next();
      observer.complete();
    } catch (e) {
      observer.error(e);
    }
  }

  private _handleEthEvents(): void {
    const eth = (window as any).ethereum as Ethereum;

    eth.on(EthEvents.ChainChanged, (chainId: string) => {
      // It's recommended to reload the page on chain changes, unless you have good reason not to.
      // window.location.reload()

      this._chainChanged$.next(chainId);
    });

    eth.on(EthEvents.Connect, (connectInfo: ConnectInfo) => {
      this._connectChanged$.next(connectInfo);
    });

    eth.on(EthEvents.Disconnect, (error: ProviderRpcError) => {
      this._disconnectChanged$.next(error);
    });

    eth.on(EthEvents.Message, (message: ProviderMessage) => {
      this._messageChanged$.next(message);
    });
  }

  private _request<T = any>(
    method: EthMethods,
    params?: unknown[] | Record<string, unknown>,
  ): Observable<T> {
    const eth = (window as any).ethereum as Ethereum;

    return from(eth.request({ method, params }));
  }
}
