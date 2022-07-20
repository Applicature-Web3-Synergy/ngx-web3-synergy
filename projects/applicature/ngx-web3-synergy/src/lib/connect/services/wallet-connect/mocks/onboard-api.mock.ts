/* eslint-disable @typescript-eslint/no-unused-vars */

import { BehaviorSubject, lastValueFrom } from 'rxjs';

import {
  Account,
  AppState, ConnectedChain,
  ConnectOptions,
  ConnectOptionsString,
  DisconnectOptions,
  OnboardAPI,
  WalletState
} from '@web3-onboard/core/dist/types';

import { WalletStateDisconnectedMock, WalletStateMock } from './wallet-state.mock';
import { AppStateDisconnectedMock, AppStateMock } from './app-state.mock';
import { map } from 'rxjs/operators';
import { W3sNativeCurrencies } from '../../../../constants';


export class OnboardAPIMock implements OnboardAPI {
  public state$: BehaviorSubject<AppState> = new BehaviorSubject<AppState>({ ...AppStateMock });
  public isConnected = true;

  public connectWallet(options?: ConnectOptions | ConnectOptionsString): Promise<WalletState[]> {
    return Promise.resolve()
      .then(() => {
        this.state$.next({ ...AppStateMock });
        this.isConnected = true;

        return [ { ...WalletStateMock } ];
      });
  }

  public disconnectWallet(options: DisconnectOptions): Promise<WalletState[]> {
    return Promise.resolve()
      .then(() => {
        this.state$.next(options?.label ? { ...AppStateDisconnectedMock } : { ...AppStateMock });
        this.isConnected = false;

        return options?.label ? [ { ...WalletStateDisconnectedMock } ] : [ { ...WalletStateMock } ];
      });
  }

  public setChain(options: {
    chainId: string;
    chainNamespace?: string;
    wallet?: WalletState['label'];
  }): Promise<boolean> {
    if ( !options || !this.isConnected ) {
      return Promise.resolve(false);
    }

    const state: AppState = { ...this.state$.value };
    state.wallets = state.wallets.map((wallet: WalletState) => {
      return {
        ...wallet,
        accounts: wallet.accounts.map((account: Account) => {
          return {
            ...account,
            balance: {
              ETH: Math.floor(Math.random() * 10).toString()
            }
          };
        }),
        chains: wallet.chains.sort((chain: ConnectedChain) => chain.id === options.chainId ? -1 : 0)
      };
    });

    this.state$.next(state);

    return Promise.resolve(!!options?.chainId);
  }

  public state = {
    select: (stateKey?: string) => {
      return stateKey
        ? this.state$.pipe(map(state => state[stateKey] ?? null))
        : this.state$;
    },
    get: () => this.state$.value,
    actions: null
  };
}
