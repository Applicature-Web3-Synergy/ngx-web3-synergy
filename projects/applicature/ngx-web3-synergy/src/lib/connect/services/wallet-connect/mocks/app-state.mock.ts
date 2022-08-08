import { AppState } from '@web3-onboard/core';

import { WalletStateMock } from './wallet-state.mock';
import { chainsMock } from './initialization-config.mock';

export const AppStateMock: AppState = {
  chains: chainsMock(),
  walletModules: [],
  wallets: [ { ...WalletStateMock }],
  accountCenter: null,
  locale: 'en',
  notify: null,
  notifications: []
};

export const AppStateDisconnectedMock: AppState = {
  ...AppStateMock,
  chains: [],
  walletModules: [],
  wallets: []
};
