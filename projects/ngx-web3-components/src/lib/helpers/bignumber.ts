import { CurrencyAmount, Ether } from '@uniswap/sdk-core';
import BigNumber from 'bignumber.js';
import { CHAIN_ID_TO_NETWORK_ID_MAP } from '../constants';
import { Ethereum } from '../interfaces';
import { getClientLocale } from './locale';

export function valueToBigNumber(amount: BigNumber.Value): BigNumber {
  return new BigNumber(amount);
}

const bn10PowLookupMap: Map<number, BigNumber> = new Map<number, BigNumber>([]);

export function pow10(decimals: number): BigNumber {
  if (!bn10PowLookupMap.has(decimals)) {
    bn10PowLookupMap.set(decimals, new BigNumber(10).pow(decimals));
  }

  return bn10PowLookupMap.get(decimals) as BigNumber;
}

export function normalize(value: BigNumber.Value, decimals: number): string {
  return normalizeBN(value, decimals).toString(10);
}

export function normalizeBN(value: BigNumber.Value, decimals: number): BigNumber {
  return valueToBigNumber(value).dividedBy(pow10(decimals));
}

export function normalizeBalance(value: BigNumber.Value, digits: number = 3): string {
  const { chainId } = (window as any).ethereum as Ethereum;
  const networkId = CHAIN_ID_TO_NETWORK_ID_MAP[chainId]

  if(!networkId || value === null || value === undefined) {
    return null;
  }

  return CurrencyAmount.fromRawAmount(Ether.onChain(networkId), value.toString()).toSignificant(digits);
}

export function shortenValue(value: BigNumber.Value, decimalAmount = 6, shortDecimalAmount = 4): string {
  const locale = getClientLocale();
  const units = ['', 'k', 'mln', 'bln', 'trn', 'quad', 'quin'];
  const numberStr = valueToBigNumber(value).toString(10);
  const divideNumber = [1, 1000, 1000000, 1000000000, 1000000000000, 1000000000000000, 1000000000000000000];
  const decimalLocaleSign = (0.1).toLocaleString(locale)[1];

  if (+value < 10 && numberStr.indexOf('.000000') === 1) {
    // transform leading zeros after "."
    const parts = numberStr.split('.');
    const formattedShortDecimal = (+parts[1]).toString().substr(0, shortDecimalAmount);
    const formattedDecimal = `0...0${formattedShortDecimal}`;

    return `${parts[0]}${decimalLocaleSign}${formattedDecimal || ''}`;
  }

  const stepsIndex = Math.floor((numberStr.split('.')[0].length - 1) / 3);
  let formattedNumber = valueToBigNumber(value).dividedBy(divideNumber[stepsIndex]).toString(10);
  const numberParts = formattedNumber.split('.');

  if (numberParts[1]) {
    // cut decimal part
    const cutAmount = stepsIndex === 1 ? 3 : decimalAmount;

    formattedNumber = `${numberParts[0]}.${numberParts[1].substr(0, cutAmount)}`;
    // remove unneeded decimal "0" and "."
    formattedNumber = formattedNumber.replace(/[0]+$/g, '').replace(/[\.]$/, '');
  }

  return `${formattedNumber.split('.').join(decimalLocaleSign)}${units[stepsIndex]}`;
}

export function numberToString(number: number | string): string {
  const locale = getClientLocale();
  const numberStr = valueToBigNumber(number).toString(10);
  const decimalLocaleSign = (0.1).toLocaleString(locale)[1];
  const numberParts = numberStr.split('.');
  const integerPart = (+numberParts[0]).toLocaleString(getClientLocale());
  const decimalPart = numberParts[1] || '';

  return `${integerPart}${decimalPart ? decimalLocaleSign + decimalPart : ''}`;
}
