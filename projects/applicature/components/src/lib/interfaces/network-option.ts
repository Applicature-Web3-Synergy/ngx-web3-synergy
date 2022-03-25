import { AucEthChainParams } from './ethereum';

export interface AucNetworkOption {
  /** {@link icon} - currency icon url */
  icon: string;
  name: string;
  chainId: string;
  /** {@link symbol} -  currency symbol. You can use AucNativeCurrencies[chainID].name or other string. */
  symbol: string;

  /** {@link blockExplorerUrl} - Ex: https://etherscan.io. <br>
   * You can use or {@link AucBlockExplorerUrls[chainId][0]} set other url.
   * */
  blockExplorerUrl: string;

  /*** {@link isActive} - sets option as active */
  isActive?: boolean;
  disabled?: boolean;

  /*** {@link chainParams} - this params used for adding new network to the Metamask. */
  chainParams?: AucEthChainParams;
}
