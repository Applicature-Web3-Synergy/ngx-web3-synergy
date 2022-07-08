import { W3sWrongNetworkAppearance } from '../types';

export interface W3sWrongNetworkModalData {
  header: string;
  message: string;
  chainId: string;
  switchLabel: string;
  appearance: W3sWrongNetworkAppearance;
}
