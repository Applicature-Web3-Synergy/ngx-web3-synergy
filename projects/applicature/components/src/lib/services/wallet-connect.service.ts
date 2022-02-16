import { Injectable } from '@angular/core';

import Onboard from 'bnc-onboard';
import { API, Initialization, Subscriptions, Wallet } from 'bnc-onboard/dist/src/interfaces';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import Web3 from 'web3';

import { EthEvents, EthMethods } from '../enums';
import { Ethereum, EthChainParams, ProviderMessage, ProviderRpcError, ConnectInfo } from '../interfaces';

const APPLICATURE_CONNECTED_WALLET_NAME = 'APPLICATURE_CONNECTED_WALLET_NAME';

@Injectable()
export class WalletConnectService {
  public get web3(): Web3 {
    return this._web3;
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

  public async initialize(config: Omit<Initialization, 'subscriptions' | 'darkMode' | 'hideBranding'>): Promise<void> {
    if (this._onboard) {
      return;
    }

    return new Promise(async (resolve, reject) => {
      this._onboard = Onboard({
        ...config,
        walletSelect: {
          ...config.walletSelect,
          heading: 'Connect a wallet',
          description: '',
        },
        subscriptions: this._getSubscriptions(resolve),
        hideBranding: true,
      });

      const previouslySelectedWallet = localStorage.getItem(APPLICATURE_CONNECTED_WALLET_NAME);

      if (previouslySelectedWallet !== null) {
        return await this._onboard.walletSelect(previouslySelectedWallet);
      }

      return await this._initWeb3(resolve);
    });
  }

  public async connectWallet(): Promise<boolean> {
    if (!this._onboard) {
      throw new Error('initialize method must be called');
    }

    if (await this._onboard.walletSelect()) {
      return await this._onboard.walletCheck();
    }

    const state = this._onboard.getState();

    return !!state.address;
  }

  public async disconnectWallet(): Promise<void> {
    this._onboard.walletReset();

    localStorage.removeItem(APPLICATURE_CONNECTED_WALLET_NAME);
  }

  public async switchEthereumChain(chainId: string): Promise<void> {
    await this._request(EthMethods.SwitchEthereumChain, [{ chainId }]);
  }

  public async addEthereumChain(params: Partial<EthChainParams>): Promise<void> {
    await this._request(EthMethods.AddEthereumChain, [params]);
  }

  private _getSubscriptions(resolve: () => void): Subscriptions {
    let selectedWallet: Wallet;

    return {
      address: async (address: string) => {
        console.log('address: ', address);
        this._accountsChanged$.next(address ? [address] : []);

        await this._initWeb3(resolve, selectedWallet);
      },
      network: (networkId: number) => {
        console.log('networkId: ', networkId);
        this._onboard.config({ networkId });

        this._networkChanged$.next(networkId);
      },
      wallet: async (wallet: Wallet) => {
        console.log('wallet: ', wallet);
        selectedWallet = wallet;

        await this._initWeb3(resolve, selectedWallet);
      },
      balance: (balance: string) => {
        console.log('balance: ', balance);
        this._balanceChanged$.next(balance);
      },
    };
  }

  private async _initWeb3(resolve: () => void, selectedWallet?: Wallet): Promise<void> {
    const provider = Object.assign({}, selectedWallet?.provider || {});

    if (!provider?.selectedAddress || !selectedWallet?.name) {
      this._web3 = new Web3();
    } else {
      localStorage.setItem(APPLICATURE_CONNECTED_WALLET_NAME, selectedWallet.name);

      this._web3 = new Web3(selectedWallet.provider);
    }

    this._handleEthEvents();

    resolve();
  }

  private _handleEthEvents() {
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
  ): Promise<T> {
    const eth = (window as any).ethereum as Ethereum;

    return eth.request({ method, params });
  }
}
