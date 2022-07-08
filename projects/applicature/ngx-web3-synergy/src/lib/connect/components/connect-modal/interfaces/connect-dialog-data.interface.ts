import { W3sWalletConnectService } from '../../../services';

export interface W3sConnectDialogConfig {
  title?: string;
}

export interface W3sConnectDialogData extends W3sConnectDialogConfig {
  service: W3sWalletConnectService
}
