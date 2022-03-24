/**
 *
 * This method uses for converting chainId as a number to 0x-prefixed hexadecimal string
 *
 * {@see AUC_CHAIN_ID} - Already converted Chains;
 *
 * @param chainId - this is chainId as number.
 * You can use {@link AUC_CHAIN_ID_NUM} or your specific value.
 */

export function aucConvertChainIdToHex(chainId: number | string): string {
  if (!chainId && chainId !== 0 && chainId !== '0') {
    return null;
  }

  const chain = parseInt(chainId.toString(), 10);

  return `0x${chain.toString(16)}`;
}
