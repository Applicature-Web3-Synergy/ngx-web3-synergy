import { AucWrongNetworkAppearance } from '../types';

export interface AucWrongNetworkModalData {
  header: string;
  message: string;
  chainId: string;
  switchLabel: string;
  appearance: AucWrongNetworkAppearance;
}
