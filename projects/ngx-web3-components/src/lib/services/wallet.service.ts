import { Injectable } from '@angular/core';

import Onboard from 'bnc-onboard';
import { API, Initialization, Subscriptions, Wallet } from 'bnc-onboard/dist/src/interfaces';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import Web3 from 'web3';
import { EthereumEventName, EthereumMethods } from '../enums';
import {
  ConnectInfo,
  Ethereum,
  EthereumChainParams,
  ProviderMessage,
  ProviderRpcError
} from '../interfaces';

const WALLET_NAME = 'METAMASK_SELECTED_WALLET_NAME';

@Injectable()
export class WalletService {
  public get web3(): Web3 | undefined {
    return this._web3;
  }

  public get onboard(): API {
    return this._onboard;
  }

  public get accountsChanged$(): Observable<string[]> {
    return this._accountsChanged$.asObservable();
  }

  public get chainChanged$(): Observable<string> {
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

  public get networkChanged$(): Observable<number> {
    return this._networkChanged$.asObservable();
  }

  public get balanceChanged$(): Observable<string> {
    return this._balanceChanged$.asObservable();
  }

  private _onboard!: API;
  private _web3!: Web3 | undefined;
  private _subscriptions!: Subscriptions;
  private _accountsChanged$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _chainChanged$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _networkChanged$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private _balanceChanged$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _connectChanged$: Subject<ConnectInfo> = new Subject<ConnectInfo>();
  private _disconnectChanged$: Subject<ProviderRpcError> = new Subject<ProviderRpcError>();
  private _messageChanged$: Subject<ProviderMessage> = new Subject<ProviderMessage>();

  public async init(initialization: Omit<Initialization, 'subscriptions' | 'darkMode' | 'hideBranding'>): Promise<void> {
    return new Promise(async (resolve) => {
      this._subscriptions = this._getSubscriptions(resolve);

      this._onboard = Onboard({
        ...initialization,
        walletSelect: {
          ...initialization.walletSelect,
          heading: initialization.walletSelect?.heading || 'Connect a wallet',
        },
        subscriptions: this._subscriptions,
        hideBranding: true,
      });

      this._handleEvents();

      const walletName = localStorage.getItem(WALLET_NAME);

      if (walletName && (await this.onboard.walletSelect(walletName))) {
        await this.onboard.walletCheck();
      } else {
        resolve();
      }
    });
  }

  public async connectWallet(): Promise<boolean> {
    if (!this.onboard) {
      throw new Error('init must be called before connectWallet')
    }

    if (await this.onboard.walletSelect()) {
      return await this.onboard.walletCheck();
    }

    const state = this.onboard.getState();

    return !!state.address;
  }

  public async switchEthereumChain(chainId: string): Promise<void> {
    const eth = (window as any).ethereum as Ethereum;

    await eth.request({
      method: EthereumMethods.SwitchEthereumChain,
      params: [{ chainId }]
    })
  }

  public async addEthereumChain(params: Partial<EthereumChainParams>): Promise<void> {
    const eth = (window as any).ethereum as Ethereum;

    await eth.request({
      method: EthereumMethods.AddEthereumChain,
      params: [params],
    });
  }

  public disconnectWallet(): void {
    this._web3 = undefined;
    this.onboard.walletReset();
    localStorage.removeItem(WALLET_NAME);
  }

  private async _initWeb3(selectedWallet: Wallet, resolve: () => void) {
    const provider = Object.assign({}, selectedWallet.provider);
    const accountAddress = provider?.selectedAddress;

    if (!accountAddress || !selectedWallet?.name || this.web3) {
      return;
    }

    const walletName = selectedWallet.name;

    this._web3 = new Web3(selectedWallet.provider);

    localStorage.setItem(WALLET_NAME, walletName);

    resolve();
  }

  private _getSubscriptions(resolve: () => void): Subscriptions {
    let selectedWallet: Wallet;

    return {
      address: async (address: string) => {
        this._accountsChanged$.next(address ? [address] : []);

        await this._initWeb3(selectedWallet, resolve);
      },
      network: (networkId: number) => {
        console.log(networkId)
        this.onboard.config({ networkId });

        this._networkChanged$.next(networkId);
      },
      wallet: async (wallet: Wallet) => {
        console.log(wallet)
        selectedWallet = wallet;

        await this._initWeb3(selectedWallet, resolve);
      },
      balance: (balance: string) => {
        console.log(balance);
        this._balanceChanged$.next(balance);
      },
    };
  }

  private _handleEvents() {
    const eth = (window as any).ethereum as Ethereum;

    eth.on(EthereumEventName.ChainChanged, (chainId: string) => {
      // It's recommended to reload the page on chain changes, unless you have good reason not to.
      // window.location.reload()

      this._chainChanged$.next(chainId);
    });

    eth.on(EthereumEventName.Connect, (connectInfo: ConnectInfo) => {
      this._connectChanged$.next(connectInfo);
    });

    eth.on(EthereumEventName.Disconnect, (error: ProviderRpcError) => {
      this._disconnectChanged$.next(error);
    });

    eth.on(EthereumEventName.Message, (message: ProviderMessage) => {
      this._messageChanged$.next(message);
    });
  }
}
