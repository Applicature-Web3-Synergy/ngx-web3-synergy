import { AucEthChainParams } from '../renamed/interfaces';
import { AucBlockExplorerUrls, AucChainName, AucNativeCurrencies, AucRpcUrls } from '../renamed/constants';


/**
 * This method is uses for generating network config which is uses for adding new network to the Metamask.
 *
 * @param chainId - 0x-prefixed hexadecimal string;
 */

export function aucGetChainParams(chainId: string = ''): AucEthChainParams {
  if (!AucChainName[chainId]) {
    return null;
  }

  return {
    chainId: chainId,
    chainName: AucChainName[chainId],
    nativeCurrency: AucNativeCurrencies[chainId],
    rpcUrls: AucRpcUrls[chainId],
    blockExplorerUrls: AucBlockExplorerUrls[chainId]
  }
}
