import { AUC_CHAIN_ID } from '../enums';

export const AucBlockExplorerApiUrl: { [key: string]: string } = {
  [AUC_CHAIN_ID.ARBITRUM_MAINNET]: 'https://api.arbiscan.io/api',
  [AUC_CHAIN_ID.ARBITRUM_TESTNET]: 'https://api-testnet.arbiscan.io/api',
  [AUC_CHAIN_ID.OPTIMISTIC_MAINNET]: 'https://api-optimistic.etherscan.io/api',
  [AUC_CHAIN_ID.OPTIMISTIC_TESTNET]: 'https://api-kovan-optimistic.etherscan.io/api',
  [AUC_CHAIN_ID.BSC_MAINNET]: 'https://api.bscscan.com/api',
  [AUC_CHAIN_ID.BSC_TESTNET]: 'https://api-testnet.bscscan.com/api',
  [AUC_CHAIN_ID.POLYGON_MAINNET]: 'https://api.polygonscan.com/api',
  [AUC_CHAIN_ID.POLYGON_TESTNET]: 'https://api-testnet.polygonscan.com/api',
  [AUC_CHAIN_ID.ASTAR_MAINNET]: null, // Doesn't support
  [AUC_CHAIN_ID.ASTAR_TESTNET]: null,  // Doesn't support
  [AUC_CHAIN_ID.SHIDEN_MAINNET]: null,  // Doesn't support
  [AUC_CHAIN_ID.SHIDEN_TESTNET]: null,  // Doesn't support
  [AUC_CHAIN_ID.AVALANCH_MAINNET]: 'https://api.snowtrace.io/api',
  [AUC_CHAIN_ID.AVALANCH_TESTNET]: 'https://api-testnet.snowtrace.io/api',
  [AUC_CHAIN_ID.FANTOM_MAINNET]: 'https://api.ftmscan.com/api',
  [AUC_CHAIN_ID.FANTOM_TESTNET]: 'https://api-testnet.ftmscan.com/api',
  [AUC_CHAIN_ID.THETA_MAINNET]: null,  // Doesn't support
  [AUC_CHAIN_ID.THETA_TESTNET]: null,  // Doesn't support
  [AUC_CHAIN_ID.ETHEREUM_MAINNET]: 'https://api.etherscan.io/api',
  [AUC_CHAIN_ID.RINKEBY_TESTNET]: 'https://api-rinkeby.etherscan.io/api',
  [AUC_CHAIN_ID.ROPSTEN_TESTNET]: 'https://api-ropsten.etherscan.io/api',
  [AUC_CHAIN_ID.GOERLI_TESTNET]: 'https://api-goerli.etherscan.io/api',
  [AUC_CHAIN_ID.KOVAN_TESTNET]: 'https://api-kovan.etherscan.io/api',
}
