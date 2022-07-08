import { CurrencyAmount, Ether } from '@uniswap/sdk-core';
import BigNumber from 'bignumber.js';


export function w3sFromWei(val: string, decimals = 18): string {
  return w3sToBN(val)
    .times(w3sToBN(10).pow(-decimals))
    .toString();
}

export function w3sToWei(val: BigNumber.Value, decimals = 18, toFixed?: number): string {
  const bn = w3sToBN(w3sToBN(val).toFixed(decimals))
    .times(w3sToBN(10).pow(decimals));

  if (toFixed || toFixed === 0) {
    return bn.toFixed(0);
  }

  return bn.toFixed();
}

export function w3sToBN(val: BigNumber.Value | null): BigNumber {
  return new BigNumber(val || 0);
}

const w3sBn10PowLookupMap: Map<number, BigNumber> = new Map<number, BigNumber>([]);

export function w3sPow10(decimals: number): BigNumber {
  if (!w3sBn10PowLookupMap.has(decimals)) {
    w3sBn10PowLookupMap.set(decimals, new BigNumber(10).pow(decimals));
  }

  return w3sBn10PowLookupMap.get(decimals);
}

export function w3sNormalize(value: BigNumber.Value, decimals = 2): string {
  return w3sNormalizeBN(value, decimals).toString(10);
}

export function w3sNormalizeBN(value: BigNumber.Value, decimals = 2): BigNumber {
  return w3sToBN(value).dividedBy(w3sPow10(decimals));
}

/**
 *
 * @param networkId - connected network id.
 * @param value - converted value.
 * @param digits - significant digits.
 */
export function w3sNormalizeBalance(networkId: number, value: BigNumber.Value, digits = 3): string {
  if (!networkId || value === null || value === undefined) {
    return null;
  }

  return CurrencyAmount.fromRawAmount(Ether.onChain(networkId), value.toString()).toSignificant(digits);
}
