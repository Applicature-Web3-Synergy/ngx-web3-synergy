import { CurrencyAmount, Ether } from '@uniswap/sdk-core';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { Unit } from 'web3-utils';

import { Ethereum } from '../interfaces';
import { CHAIN_ID_TO_NETWORK_ID_MAP } from './network';

export function fromWei(value: BigNumber.Value, unit: Unit = 'ether'): string {
  if (value instanceof BigNumber) {
    value = value.toString();
  }

  return Web3.utils.fromWei(String(value || 0), unit);
}

export function toWei(value: BigNumber.Value, unit: Unit = 'ether'): string {
  if (value instanceof BigNumber) {
    value = value.toString();
  }

  return Web3.utils.toWei(String(value || 0), unit);
}

export function toBN(amount: BigNumber.Value): BigNumber {
  return new BigNumber(amount);
}

const bn10PowLookupMap: Map<number, BigNumber> = new Map<number, BigNumber>([]);

export function pow10(decimals: number): BigNumber {
  if (!bn10PowLookupMap.has(decimals)) {
    bn10PowLookupMap.set(decimals, new BigNumber(10).pow(decimals));
  }

  return bn10PowLookupMap.get(decimals) as BigNumber;
}

export function normalize(value: BigNumber.Value, decimals: number = 2): string {
  return normalizeBN(value, decimals).toString(10);
}

export function normalizeBN(value: BigNumber.Value, decimals: number = 2): BigNumber {
  return toBN(value).dividedBy(pow10(decimals));
}

export function normalizeBalance(value: BigNumber.Value, digits: number = 3): string {
  const { chainId } = (window as any).ethereum as Ethereum;
  const networkId = CHAIN_ID_TO_NETWORK_ID_MAP[chainId]

  if (!networkId || value === null || value === undefined) {
    return null;
  }

  return CurrencyAmount.fromRawAmount(Ether.onChain(networkId), value.toString()).toSignificant(digits);
}
