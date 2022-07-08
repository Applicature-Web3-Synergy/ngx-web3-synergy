import { W3sEthChainParams } from '../interfaces';
import { W3sBlockExplorerUrls, W3sChainName, W3sNativeCurrencies, W3sRpcUrls } from '../constants';


/**
 * This method is uses for generating network config which is uses for adding new network to the Metamask.
 * @param chainId - 0x-prefixed hexadecimal string;
 */

export function w3sGetChainParams(chainId = ''): W3sEthChainParams {
  if (!W3sChainName[chainId]) {
    return null;
  }

  return {
    chainId: chainId,
    chainName: W3sChainName[chainId],
    nativeCurrency: W3sNativeCurrencies[chainId],
    rpcUrls: W3sRpcUrls[chainId],
    blockExplorerUrls: W3sBlockExplorerUrls[chainId]
  }
}
