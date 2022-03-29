import { AucEthChainParams } from './ethereum';

export interface AucNetworkOption {
  /** {@link icon} - currency icon url */
  icon: string;
  name: string;
  chainId: string;
  /** {@link symbol} -  currency symbol. You can use AucNativeCurrencies[chainID].name or other string. */
  symbol: string;

  /** {@link blockExplorerUrl} - Ex: https://etherscan.io. <br>
   * You can use {@link AucBlockExplorerUrls[chainId][0]} or set other url.
   * */
  blockExplorerUrl: string;

  /** {@link blockExplorerApiUrl} - Ex: https://api.etherscan.io/api. <br>
   * Used for getting transactions information.
   * You can use {@link AucBlockExplorerUrls[chainId]} or set other url.
   * */
  blockExplorerApiUrl?: string;

  /*** {@link isActive} - sets option as active */
  isActive?: boolean;
  disabled?: boolean;

  /*** {@link chainParams} - this params used for adding new network to the Metamask. */
  chainParams?: AucEthChainParams;
}
