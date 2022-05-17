import { InitOptions } from '@web3-onboard/core/dist/types';

import { AucChain } from '../wallet-connect.service';

export interface AucInitOptions extends InitOptions {
  chains: AucChain[];
}

export interface BlockExplorerUrlsByChainId {
  [chainId: string]: {
    blockExplorerUrl: string;
    blockExplorerApiUrl?: string;
  }
}
