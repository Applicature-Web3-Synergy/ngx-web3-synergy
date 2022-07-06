import { AucWalletConnectService } from '../../../services';

export interface AucConnectDialogConfig {
  title?: string;
}

export interface AucConnectDialogData extends AucConnectDialogConfig {
  service: AucWalletConnectService
}
