export const ROPSTEN = 'ropsten';
export const RINKEBY = 'rinkeby';
export const KOVAN = 'kovan';
export const MAINNET = 'mainnet';
export const GOERLI = 'goerli';
export const BSC = 'bscscan';
export const BSC_TESTNET = 'testnet';
export const LOCALHOST = 'localhost';
export const NETWORK_TYPE_RPC = 'rpc';

export const MAINNET_NETWORK_ID = 1;
export const ROPSTEN_NETWORK_ID = 3;
export const RINKEBY_NETWORK_ID = 4;
export const GOERLI_NETWORK_ID = 5;
export const KOVAN_NETWORK_ID = 42;
export const LOCALHOST_NETWORK_ID = 1337;
export const BSC_NETWORK_ID = 56;
export const BSC_TESTNET_NETWORK_ID = 97;

export const MAINNET_CHAIN_ID = '0x1';
export const ROPSTEN_CHAIN_ID = '0x3';
export const RINKEBY_CHAIN_ID = '0x4';
export const GOERLI_CHAIN_ID = '0x5';
export const KOVAN_CHAIN_ID = '0x2a';
export const LOCALHOST_CHAIN_ID = '0x539';
export const BSC_CHAIN_ID = '0x38';
export const BSC_TESTNET_CHAIN_ID = '0x61';
export const OPTIMISM_CHAIN_ID = '0xa';
export const OPTIMISM_TESTNET_CHAIN_ID = '0x45';
export const POLYGON_CHAIN_ID = '0x89';

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

export const CHAIN_ID_TO_TYPE_MAP = Object.entries(NETWORK_TYPE_TO_ID_MAP)
  .reduce((chainIdToTypeMap: any, [networkType, { chainId }]) => {
    chainIdToTypeMap[chainId] = networkType;

    return chainIdToTypeMap;
  }, {});

// export const CHAIN_ID_TO_NETWORK_ID_MAP = Object.values(NETWORK_TYPE_TO_ID_MAP)
//   .reduce((chainIdToNetworkIdMap: any, { chainId, networkId }) => {
//     chainIdToNetworkIdMap[chainId] = networkId;
//
//     return chainIdToNetworkIdMap;
//   }, {});
