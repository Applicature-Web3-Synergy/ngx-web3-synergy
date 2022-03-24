// TODO need to delete in the future.
/** @deprecated - Deprecated will be removed soon. */
export const ROPSTEN = 'ropsten';

/** @deprecated - Deprecated will be removed soon. */
export const RINKEBY = 'rinkeby';

/** @deprecated - Deprecated will be removed soon. */
export const KOVAN = 'kovan';

/** @deprecated - Deprecated will be removed soon. */
export const MAINNET = 'mainnet';

/** @deprecated - Deprecated will be removed soon. */
export const GOERLI = 'goerli';

/** @deprecated - Deprecated will be removed soon. */
export const BSC = 'bscscan';

/** @deprecated - Deprecated will be removed soon. */
export const BSC_TESTNET = 'testnet';

/** @deprecated - Deprecated will be removed soon. */
export const LOCALHOST = 'localhost';

/** @deprecated - Deprecated will be removed soon. */
export const NETWORK_TYPE_RPC = 'rpc';

/** @deprecated - Deprecated will be removed soon. */
export const MAINNET_NETWORK_ID = 1;

/** @deprecated - Deprecated will be removed soon. */
export const ROPSTEN_NETWORK_ID = 3;

/** @deprecated - Deprecated will be removed soon. */
export const RINKEBY_NETWORK_ID = 4;

/** @deprecated - Deprecated will be removed soon. */
export const GOERLI_NETWORK_ID = 5;

/** @deprecated - Deprecated will be removed soon. */
export const KOVAN_NETWORK_ID = 42;

/** @deprecated - Deprecated will be removed soon. */
export const LOCALHOST_NETWORK_ID = 1337;

/** @deprecated - Deprecated will be removed soon. */
export const BSC_NETWORK_ID = 56;

/** @deprecated - Deprecated will be removed soon. */
export const BSC_TESTNET_NETWORK_ID = 97;

/** @deprecated - Deprecated will be removed soon. */
export const MAINNET_CHAIN_ID = '0x1';

/** @deprecated - Deprecated will be removed soon. */
export const ROPSTEN_CHAIN_ID = '0x3';

/** @deprecated - Deprecated will be removed soon. */
export const RINKEBY_CHAIN_ID = '0x4';

/** @deprecated - Deprecated will be removed soon. */
export const GOERLI_CHAIN_ID = '0x5';

/** @deprecated - Deprecated will be removed soon. */
export const KOVAN_CHAIN_ID = '0x2a';

/** @deprecated - Deprecated will be removed soon. */
export const LOCALHOST_CHAIN_ID = '0x539';

/** @deprecated - Deprecated will be removed soon. */
export const BSC_CHAIN_ID = '0x38';

/** @deprecated - Deprecated will be removed soon. */
export const BSC_TESTNET_CHAIN_ID = '0x61';

/** @deprecated - Deprecated will be removed soon. */
export const OPTIMISM_CHAIN_ID = '0xa';

/** @deprecated - Deprecated will be removed soon. */
export const OPTIMISM_TESTNET_CHAIN_ID = '0x45';

/** @deprecated - Deprecated will be removed soon. */
export const POLYGON_CHAIN_ID = '0x89';

/** @deprecated - Deprecated will be removed soon. */
export const NETWORK_TYPE_TO_ID_MAP = {
  [ROPSTEN]: { networkId: ROPSTEN_NETWORK_ID, chainId: ROPSTEN_CHAIN_ID },
  [RINKEBY]: { networkId: RINKEBY_NETWORK_ID, chainId: RINKEBY_CHAIN_ID },
  [KOVAN]: { networkId: KOVAN_NETWORK_ID, chainId: KOVAN_CHAIN_ID },
  [GOERLI]: { networkId: GOERLI_NETWORK_ID, chainId: GOERLI_CHAIN_ID },
  [MAINNET]: { networkId: MAINNET_NETWORK_ID, chainId: MAINNET_CHAIN_ID },
  [BSC]: { networkId: BSC_NETWORK_ID, chainId: BSC_CHAIN_ID },
  [BSC_TESTNET_CHAIN_ID]: { networkId: BSC_TESTNET_NETWORK_ID, chainId: BSC_TESTNET_CHAIN_ID },
  [LOCALHOST]: { networkId: LOCALHOST_NETWORK_ID, chainId: LOCALHOST_CHAIN_ID },
};

/** @deprecated - Deprecated will be removed soon. */
export const CHAIN_ID_TO_TYPE_MAP = Object.entries(NETWORK_TYPE_TO_ID_MAP)
  .reduce((chainIdToTypeMap: any, [networkType, { chainId }]) => {
    chainIdToTypeMap[chainId] = networkType;

    return chainIdToTypeMap;
  }, {});

