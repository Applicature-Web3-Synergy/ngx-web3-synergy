import { W3sWalletLabel } from '../../../services';

export interface W3sConnectWalletItem {
  label: W3sWalletLabel;
  icon: string;
  active: boolean;
  needToInstall: boolean;
  position: number;
}
