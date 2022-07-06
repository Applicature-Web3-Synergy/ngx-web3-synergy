import { CurrencyAmount, Ether } from '@uniswap/sdk-core';
import BigNumber from 'bignumber.js';


export function aucFromWei(val: string, decimals = 18): string {
  return aucToBN(val)
    .times(aucToBN(10).pow(-decimals))
    .toString();
}

export function aucToWei(val: BigNumber.Value, decimals = 18, toFixed?: number): string {
  const bn = aucToBN(aucToBN(val).toFixed(decimals))
    .times(aucToBN(10).pow(decimals));

  if (toFixed || toFixed === 0) {
    return bn.toFixed(0);
  }

  return bn.toFixed();
}

export function aucToBN(val: BigNumber.Value | null): BigNumber {
  return new BigNumber(val || 0);
}

const aucBn10PowLookupMap: Map<number, BigNumber> = new Map<number, BigNumber>([]);

export function aucPow10(decimals: number): BigNumber {
  if (!aucBn10PowLookupMap.has(decimals)) {
    aucBn10PowLookupMap.set(decimals, new BigNumber(10).pow(decimals));
  }

  return aucBn10PowLookupMap.get(decimals);
}

export function aucNormalize(value: BigNumber.Value, decimals = 2): string {
  return aucNormalizeBN(value, decimals).toString(10);
}

export function aucNormalizeBN(value: BigNumber.Value, decimals = 2): BigNumber {
  return aucToBN(value).dividedBy(aucPow10(decimals));
}

/**
 *
 * @param networkId - connected network id.
 * @param value - converted value.
 * @param digits - significant digits.
 */
export function aucNormalizeBalance(networkId: number, value: BigNumber.Value, digits = 3): string {
  if (!networkId || value === null || value === undefined) {
    return null;
  }

  return CurrencyAmount.fromRawAmount(Ether.onChain(networkId), value.toString()).toSignificant(digits);
}
