import injectedModule from '@web3-onboard/injected-wallets';

import { Chain } from '@web3-onboard/common/dist/types';

import { W3sInitOptions } from '../interfaces';
import { W3S_CHAIN_ID } from '../../../../enums';
import { W3sBlockExplorerUrls, W3sNativeCurrencies, W3sRpcUrls } from '../../../../constants';

export const InitializationConfigMock: W3sInitOptions = {
  wallets: [
    /** Will show all installed injected wallets */
    {
      label: 'injected',
      module: injectedModule()
    }
  ],
  chains: [
    {
      id: W3S_CHAIN_ID.BSC_TESTNET,
      token: 'BNB',
      label: 'BNB Chain',
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      icon: 'assets/svg/network/bsc.svg',
      blockExplorerUrl: 'https://testnet.bscscan.com',
      blockExplorerApiUrl: 'https://api-testnet.bscscan.com/api',
      namespace: 'evm',
      color: '#000',
      providerConnectionInfo: {
        url: 'https://data-seed-prebsc-1-s1.binance.org:8545'
      }
    },
    {
      id: W3S_CHAIN_ID.POLYGON_TESTNET,
      token: W3sNativeCurrencies[W3S_CHAIN_ID.POLYGON_TESTNET].name,
      label: 'MATIC',
      rpcUrl: W3sRpcUrls[W3S_CHAIN_ID.POLYGON_TESTNET][0],
      icon: 'assets/svg/network/eth.svg',
      blockExplorerUrl: W3sBlockExplorerUrls[W3S_CHAIN_ID.POLYGON_TESTNET][0],
    }
  ]
};

export function chainsMock(): Chain[] {
  return InitializationConfigMock.chains.map(chain => {
    return {
      namespace: 'evm',
      id: chain.id,
      rpcUrl: chain.rpcUrl,
      label: chain.label,
      token: chain.token,
      icon: chain.icon
    };
  });
}
