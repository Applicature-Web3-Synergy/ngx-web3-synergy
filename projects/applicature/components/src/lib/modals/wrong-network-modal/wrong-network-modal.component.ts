import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WalletConnectService } from '../../services/wallet-connect.service';
import { WrongNetworkModalData } from './interfaces';
import { ApplicatureDialogConfig, ApplicatureDialogRef } from '../../applicature-dialog';


@Component({
  selector: 'applicature-wrong-network-modal',
  templateUrl: './wrong-network-modal.component.html',
  styleUrls: [ './wrong-network-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrongNetworkModalComponent {
  public data: WrongNetworkModalData;

  constructor(
    private _config: ApplicatureDialogConfig<WrongNetworkModalData>,
    private _dialogRef: ApplicatureDialogRef,
    private _walletConnectService: WalletConnectService
  ) {
    this.data = this._config.data;
  }

  public onCloseClick(value: boolean = false): void {
    this._dialogRef.close(value);
  }

  public onSwitchNetworkClick(): void {
    this.onCloseClick(true);
  }

  public onDisconnectClick(): void {
    this._walletConnectService.disconnectWallet();

    this.onCloseClick(false);
  }
}
