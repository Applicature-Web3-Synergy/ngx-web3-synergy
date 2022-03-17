import { AucEthChainParams } from './ethereum';

export interface AucNetworkOption {
  icon: string;
  name: string;
  chainId: string;
  isActive?: boolean;
  disabled?: boolean;
  chainParams?: AucEthChainParams;
}
