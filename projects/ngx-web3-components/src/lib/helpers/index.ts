import { getAddress } from '@ethersproject/address';
import jazzicon from '@metamask/jazzicon';

export * from './bignumber';
export * from './locale';

export function isTxHash(address: string): boolean {
  return (/^0x([A-Fa-f0-9]{64})$/).test(address);
}

export function shortTxHash(address: string): string {
  return [address.slice(0, 5), address.slice(-4)].join('...')
}

export function isAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function shortAddress(address: string, chars = 4): string | null {
  const parsed = isAddress(address);

  if (!parsed) {
    return null;
  }

  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function generateJazzicon(address: string, diameter = 24): HTMLDivElement | null {
  const parsed = isAddress(address);

  if (!parsed) {
    return null;
  }

  return jazzicon(diameter, parseInt(address.slice(2, 10), 16));
}
