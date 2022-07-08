import { W3S_CHAIN_ID } from '../enums';

export const W3sBlockExplorerUrls: { [key: string]: string[] } = {
  [W3S_CHAIN_ID.ARBITRUM_MAINNET]: [ 'https://arbiscan.io' ],
  [W3S_CHAIN_ID.ARBITRUM_TESTNET]: [ 'https://rinkeby-explorer.arbitrum.io/#/' ],
  [W3S_CHAIN_ID.OPTIMISTIC_MAINNET]: [ 'https://optimistic.etherscan.io' ],
  [W3S_CHAIN_ID.OPTIMISTIC_TESTNET]: [ 'https://kovan-optimistic.etherscan.io' ],
  [W3S_CHAIN_ID.BSC_MAINNET]: [ 'https://bscscan.com' ],
  [W3S_CHAIN_ID.BSC_TESTNET]: [ 'https://testnet.bscscan.com' ],
  [W3S_CHAIN_ID.POLYGON_MAINNET]: [ 'https://explorer.matic.network' ],
  [W3S_CHAIN_ID.POLYGON_TESTNET]: [ 'https://mumbai.polygonscan.com' ],
  [W3S_CHAIN_ID.ASTAR_MAINNET]: [ 'https://astar.subscan.io' ],
  [W3S_CHAIN_ID.ASTAR_TESTNET]: [ 'https://shibuya.subscan.io' ],
  [W3S_CHAIN_ID.SHIDEN_MAINNET]: [ 'https://shiden.subscan.io' ],
  [W3S_CHAIN_ID.SHIDEN_TESTNET]: [ 'https://shibuya.subscan.io' ],
  [W3S_CHAIN_ID.AVALANCH_MAINNET]: [ 'https://snowtrace.io' ],
  [W3S_CHAIN_ID.AVALANCH_TESTNET]: [ 'https://testnet.snowtrace.io' ],
  [W3S_CHAIN_ID.FANTOM_MAINNET]: [ 'https://ftmscan.com' ],
  [W3S_CHAIN_ID.FANTOM_TESTNET]: [ 'https://testnet.ftmscan.com' ],
  [W3S_CHAIN_ID.THETA_MAINNET]: [ 'https://explorer.thetatoken.org' ],
  [W3S_CHAIN_ID.THETA_TESTNET]: [ 'https://testnet-explorer.thetatoken.org' ],
  [W3S_CHAIN_ID.ETHEREUM_MAINNET]: [ 'https://etherscan.io' ],
  [W3S_CHAIN_ID.RINKEBY_TESTNET]: [ 'https://rinkeby.etherscan.io' ],
  [W3S_CHAIN_ID.ROPSTEN_TESTNET]: [ 'https://ropsten.etherscan.io' ],
  [W3S_CHAIN_ID.GOERLI_TESTNET]: [ 'https://goerli.etherscan.io' ],
  [W3S_CHAIN_ID.KOVAN_TESTNET]: [ 'https://kovan.etherscan.io' ]
};
