import { AucEthChainParams } from './ethereum';

export interface AucNetworkOption {
  icon: string;
  name: string;
  chainId: string;
  symbol: string; // currency symbol. You can use AucNativeCurrencies[chainID].name or other string.
  isActive?: boolean;
  disabled?: boolean;
  chainParams?: AucEthChainParams;
}
