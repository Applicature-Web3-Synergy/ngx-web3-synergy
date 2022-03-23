import { AucNativeCurrency } from '../interfaces';
import { AUC_CHAIN_ID } from '../renamed/enums';

export const AucNativeCurrencies: { [key: string]: AucNativeCurrency } = {
  [AUC_CHAIN_ID.ARBITRUM_MAINNET]: {
    name: 'ETH',
    symbol: 'eth',
    decimals: 18,
  },
  [AUC_CHAIN_ID.ARBITRUM_TESTNET]: {
    name: 'ETH',
    symbol: 'eth',
    decimals: 18,
  },
  [AUC_CHAIN_ID.ASTAR_MAINNET]: {
    name: 'ASTR',
    symbol: 'astr',
    decimals: 18,
  },
  [AUC_CHAIN_ID.ASTAR_TESTNET]: {
    name: 'SBY',
    symbol: 'sby',
    decimals: 18,
  },
  [AUC_CHAIN_ID.AVALANCH_MAINNET]: {
    name: 'AVAX',
    symbol: 'avax',
    decimals: 18,
  },
  [AUC_CHAIN_ID.AVALANCH_TESTNET]: {
    name: 'AVAX',
    symbol: 'avax',
    decimals: 18,
  },
  [AUC_CHAIN_ID.BSC_MAINNET]: {
    name: 'BNB',
    symbol: 'bnb',
    decimals: 18,
  },
  [AUC_CHAIN_ID.BSC_TESTNET]: {
    name: 'BNB',
    symbol: 'bnb',
    decimals: 18,
  },
  [AUC_CHAIN_ID.ETHEREUM_MAINNET]: {
    name: 'ETH',
    symbol: 'eth',
    decimals: 18,
  },
  [AUC_CHAIN_ID.FANTOM_MAINNET]: {
    name: 'FTM',
    symbol: 'ftm',
    decimals: 18,
  },
  [AUC_CHAIN_ID.FANTOM_TESTNET]: {
    name: 'FTM',
    symbol: 'ftm',
    decimals: 18,
  },
  [AUC_CHAIN_ID.GOERLI_TESTNET]: {
    name: 'ETH',
    symbol: 'eth',
    decimals: 18,
  },
  [AUC_CHAIN_ID.KOVAN_TESTNET]: {
    name: 'ETH',
    symbol: 'eth',
    decimals: 18,
  },
  [AUC_CHAIN_ID.OPTIMISTIC_MAINNET]: {
    name: 'ETH',
    symbol: 'eth',
    decimals: 18,
  },
  [AUC_CHAIN_ID.OPTIMISTIC_TESTNET]: {
    name: 'ETH',
    symbol: 'eth',
    decimals: 18,
  },
  [AUC_CHAIN_ID.POLYGON_MAINNET]: {
    name: 'MATIC',
    symbol: 'matic',
    decimals: 18,
  },
  [AUC_CHAIN_ID.POLYGON_TESTNET]: {
    name: 'MATIC',
    symbol: 'matic',
    decimals: 18,
  },
  [AUC_CHAIN_ID.RINKEBY_TESTNET]: {
    name: 'ETH',
    symbol: 'eth',
    decimals: 18,
  },
  [AUC_CHAIN_ID.ROPSTEN_TESTNET]: {
    name: 'ETH',
    symbol: 'eth',
    decimals: 18,
  },
  [AUC_CHAIN_ID.SHIDEN_MAINNET]: {
    name: 'SDN',
    symbol: 'sdn',
    decimals: 18,
  },
  [AUC_CHAIN_ID.SHIDEN_TESTNET]: {
    name: 'SBY',
    symbol: 'sby',
    decimals: 18,
  },
  [AUC_CHAIN_ID.THETA_MAINNET]: {
    name: 'TFUEL',
    symbol: 'tfuel',
    decimals: 18,
  },
  [AUC_CHAIN_ID.THETA_TESTNET]: {
    name: 'TFUEL',
    symbol: 'tfuel',
    decimals: 18,
  }
};
