/* eslint-disable @typescript-eslint/no-explicit-any */

import { WalletState } from '@web3-onboard/core';

import { MetamaskIcon } from '../../../constants/icons/metamask';
import { web3ProviderMock } from './web3-provider.mock';
import { AccountMock } from './account.mock';
import { connectedChainMock } from './connected-chain.mock';
import { PrimaryWalletLabel } from './wallet-label.mock';

export const WalletStateMock: WalletState = {
  label: PrimaryWalletLabel,
  icon: MetamaskIcon,
  provider: web3ProviderMock as any,
  accounts: [ { ...AccountMock } ],
  chains: connectedChainMock()
};

export const WalletStateDisconnectedMock: WalletState = {
  ...WalletStateMock,
  accounts: [],
  chains: []
};
