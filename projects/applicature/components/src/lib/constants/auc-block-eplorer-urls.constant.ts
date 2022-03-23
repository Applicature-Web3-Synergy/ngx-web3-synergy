import { AUC_CHAIN_ID } from '../renamed/enums';

export const AucBlockExplorerUrls: { [key: string]: string[] } = {
  [AUC_CHAIN_ID.ARBITRUM_MAINNET]: [ 'https://arbiscan.io' ],
  [AUC_CHAIN_ID.ARBITRUM_TESTNET]: [ 'https://rinkeby-explorer.arbitrum.io/#/' ],
  [AUC_CHAIN_ID.OPTIMISTIC_MAINNET]: [ 'https://optimistic.etherscan.io' ],
  [AUC_CHAIN_ID.OPTIMISTIC_TESTNET]: [ 'https://kovan-optimistic.etherscan.io' ],
  [AUC_CHAIN_ID.BSC_MAINNET]: [ 'https://bscscan.com' ],
  [AUC_CHAIN_ID.BSC_TESTNET]: [ 'https://testnet.bscscan.com' ],
  [AUC_CHAIN_ID.POLYGON_MAINNET]: [ 'https://explorer.matic.network' ],
  [AUC_CHAIN_ID.POLYGON_TESTNET]: [ 'https://mumbai-explorer.matic.today' ],
  [AUC_CHAIN_ID.ASTAR_MAINNET]: [ 'https://astar.subscan.io' ],
  [AUC_CHAIN_ID.ASTAR_TESTNET]: [ 'https://shibuya.subscan.io' ],
  [AUC_CHAIN_ID.SHIDEN_MAINNET]: [ 'https://shiden.subscan.io' ],
  [AUC_CHAIN_ID.SHIDEN_TESTNET]: [ 'https://shibuya.subscan.io' ],
  [AUC_CHAIN_ID.AVALANCH_MAINNET]: [ 'https://cchain.explorer.avax.network' ],
  [AUC_CHAIN_ID.AVALANCH_TESTNET]: [ 'https://cchain.explorer.avax-test.network' ],
  [AUC_CHAIN_ID.FANTOM_MAINNET]: [ 'https://ftmscan.com' ],
  [AUC_CHAIN_ID.FANTOM_TESTNET]: [ 'https://testnet.ftmscan.com' ],
  [AUC_CHAIN_ID.THETA_MAINNET]: [ 'https://explorer.thetatoken.org' ],
  [AUC_CHAIN_ID.THETA_TESTNET]: [ 'https://testnet-explorer.thetatoken.org' ],
  [AUC_CHAIN_ID.ETHEREUM_MAINNET]: [ 'https://etherscan.io' ],
  [AUC_CHAIN_ID.RINKEBY_TESTNET]: [ 'https://rinkeby.etherscan.io' ],
  [AUC_CHAIN_ID.ROPSTEN_TESTNET]: [ 'https://ropsten.etherscan.io' ],
  [AUC_CHAIN_ID.GOERLI_TESTNET]: [ 'https://goerli.etherscan.io' ],
  [AUC_CHAIN_ID.KOVAN_TESTNET]: [ 'https://kovan.etherscan.io' ]
};
