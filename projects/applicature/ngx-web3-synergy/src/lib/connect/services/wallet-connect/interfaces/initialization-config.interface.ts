import { Chain } from '@web3-onboard/common/dist/types';
import { WalletInit } from '@web3-onboard/common';

import { W3sWalletLabel } from '../types';


export interface W3sChain extends Chain {
  /** Ex: https://etherscan.io. <br>
   * You can use {@link W3sBlockExplorerUrls[chainId][0]} or set other url.
   * */
  blockExplorerUrl: string;
  /** Ex: https://api.etherscan.io/api. <br>
   * Used for getting transactions information.
   * You can use {@link W3sBlockExplorerUrls[chainId]} or set other url.
   * */
  blockExplorerApiUrl?: string;
}

/** Use injected type if you need to show all installed injected wallets. */
export type W3sWalletsToInitLabel = 'injected' | W3sWalletLabel;

export interface W3sWalletConfig {
  label: W3sWalletsToInitLabel,
  module: WalletInit;
  /** Customize wallet icon, uses for connect wallet dialog. */
  icon?: string;
  /** Redirects to this URL if the wallet is injected and not installed. */
  walletUrl?: string;
}

export interface W3sWalletConfigMap extends W3sWalletConfig {
  position: number;
}

export interface W3sInitOptions {
  /**
   * Supported wallets.<br>
   * Wallet with label injected will show all installed injected wallets.<br>
   * If You always want to show some of injected wallets, needs to set it in config.
   * */
  wallets: W3sWalletConfig[],
  /** Supported networks */
  chains: W3sChain[];
}

export interface W3sBlockExplorerUrlsByChainId {
  [chainId: string]: {
    blockExplorerUrl: string;
    blockExplorerApiUrl?: string;
  }
}
