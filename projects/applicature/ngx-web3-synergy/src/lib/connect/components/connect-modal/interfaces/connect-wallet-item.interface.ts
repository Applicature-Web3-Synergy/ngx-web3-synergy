import { AucWalletLabel } from '../../../services';

export interface AucConnectWalletItem {
  label: AucWalletLabel;
  icon: string;
  active: boolean;
  needToInstall: boolean;
  position: number;
}
