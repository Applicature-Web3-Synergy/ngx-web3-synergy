import { AUC_CHAIN_ID } from '../enums';

export const AucRpcUrls: { [key: string]: string[] } = {
  [AUC_CHAIN_ID.ARBITRUM_MAINNET]: [ 'https://arb1.arbitrum.io/rpc' ],
  [AUC_CHAIN_ID.ARBITRUM_TESTNET]: [ 'https://rinkeby.arbitrum.io/rpc' ],
  [AUC_CHAIN_ID.OPTIMISTIC_MAINNET]: [ 'https://mainnet.optimism.io' ],
  [AUC_CHAIN_ID.OPTIMISTIC_TESTNET]: [ 'https://kovan.optimism.io' ],
  [AUC_CHAIN_ID.BSC_MAINNET]: [ 'https://bsc-dataseed.binance.org' ],
  [AUC_CHAIN_ID.BSC_TESTNET]: [ 'https://data-seed-prebsc-1-s1.binance.org:8545' ],
  [AUC_CHAIN_ID.POLYGON_MAINNET]: [ 'https://rpc-mainnet.maticvigil.com' ],
  [AUC_CHAIN_ID.POLYGON_TESTNET]: [ 'https://rpc-mumbai.maticvigil.com' ],
  [AUC_CHAIN_ID.ASTAR_MAINNET]: [ 'https://rpc.astar.network:8545' ],
  [AUC_CHAIN_ID.ASTAR_TESTNET]: [ 'https://rpc.shibuya.astar.network:8545' ],
  [AUC_CHAIN_ID.SHIDEN_MAINNET]: [ 'https://rpc.shiden.astar.network:8545' ],
  [AUC_CHAIN_ID.SHIDEN_TESTNET]: [ 'https://rpc.shibuya.astar.network:8545' ],
  [AUC_CHAIN_ID.AVALANCH_MAINNET]: [ 'https://api.avax.network/ext/bc/C/rpc' ],
  [AUC_CHAIN_ID.AVALANCH_TESTNET]: [ 'https://api.avax-test.network/ext/bc/C/rpc' ],
  [AUC_CHAIN_ID.FANTOM_MAINNET]: [ 'https://rpc.ftm.tools' ],
  [AUC_CHAIN_ID.FANTOM_TESTNET]: [ 'https://rpc.testnet.fantom.network' ],
  [AUC_CHAIN_ID.THETA_MAINNET]: [ 'https://eth-rpc-api.thetatoken.org/rpc' ],
  [AUC_CHAIN_ID.THETA_TESTNET]: [ 'https://eth-rpc-api-testnet.thetatoken.org/rpc' ],
  [AUC_CHAIN_ID.RINKEBY_TESTNET]: [ 'https://rinkeby.infura.io/v3' ],
  [AUC_CHAIN_ID.ETHEREUM_MAINNET]: [ 'https://mainnet.infura.io/v3/3' ]
};
