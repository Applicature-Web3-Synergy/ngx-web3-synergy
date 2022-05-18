import { InitOptions } from '@web3-onboard/core/dist/types';

import { Chain } from '@web3-onboard/common/dist/types';

export interface AucChain extends Chain {
  /** Ex: https://etherscan.io. <br>
   * You can use {@link AucBlockExplorerUrls[chainId][0]} or set other url.
   * */
  blockExplorerUrl: string;
  /** Ex: https://api.etherscan.io/api. <br>
   * Used for getting transactions information.
   * You can use {@link AucBlockExplorerUrls[chainId]} or set other url.
   * */
  blockExplorerApiUrl?: string;
}

export interface AucInitOptions extends InitOptions {
  chains: AucChain[];
}

export interface BlockExplorerUrlsByChainId {
  [chainId: string]: {
    blockExplorerUrl: string;
    blockExplorerApiUrl?: string;
  }
}
