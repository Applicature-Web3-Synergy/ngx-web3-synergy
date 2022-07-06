import { getAddress } from '@ethersproject/address';
import jazzicon from '@metamask/jazzicon';

export function aucIsTxHash(address: string): boolean {
  return (/^0x([A-Fa-f0-9]{64})$/).test(address);
}

export function aucShortTxHash(address: string): string {
  return [ address.slice(0, 5), address.slice(-4) ].join('...')
}

export function aucIsAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function aucShortAddress(address: string, chars = 4): string | null {
  const parsed = aucIsAddress(address);

  if (!parsed) {
    return null;
  }

  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function aucGenerateJazzicon(address: string, diameter = 20): HTMLDivElement | null {
  const parsed = aucIsAddress(address);

  if (!parsed) {
    return null;
  }

  // eslint-disable-next-line  @typescript-eslint/no-unsafe-call
  return jazzicon(diameter, parseInt(address.slice(2, 10), 16)) as HTMLDivElement;
}
