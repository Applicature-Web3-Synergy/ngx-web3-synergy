import { Chain } from '@web3-onboard/common/dist/types';
import { WalletInit } from '@web3-onboard/common';

import { AucWalletLabel } from '../types';


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

/** Use injected type if you need to show all installed injected wallets. */
export type AucWalletsToInitLabel = 'injected' | AucWalletLabel;

export interface AucWalletConfig {
  label: AucWalletsToInitLabel,
  module: WalletInit;
  /** Customize wallet icon, uses for connect wallet dialog. */
  icon?: string;
  /** Redirects to this URL if the wallet is injected and not installed. */
  walletUrl?: string;
}

export interface AucWalletConfigMap extends AucWalletConfig {
  position: number;
}

export interface AucInitOptions {
  /**
   * Supported wallets.<br>
   * Wallet with label injected will show all installed injected wallets.<br>
   * If You always want to show some of injected wallets, needs to set it in config.
   * */
  wallets: AucWalletConfig[],
  /** Supported networks */
  chains: AucChain[];
}

export interface BlockExplorerUrlsByChainId {
  [chainId: string]: {
    blockExplorerUrl: string;
    blockExplorerApiUrl?: string;
  }
}
