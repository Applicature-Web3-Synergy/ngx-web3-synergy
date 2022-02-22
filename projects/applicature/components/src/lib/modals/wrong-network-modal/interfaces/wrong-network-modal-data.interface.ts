import { WrongNetworkAppearance } from '../types';

export interface WrongNetworkModalData {
  header: string;
  message: string;
  chainId: string;
  switchLabel: string;
  appearance: WrongNetworkAppearance;
}
