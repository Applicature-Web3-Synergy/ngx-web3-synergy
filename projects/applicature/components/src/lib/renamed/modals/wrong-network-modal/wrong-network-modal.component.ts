import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AS_COLOR_GROUP, AsColorGroup } from '@applicature/styles';

import { AucWalletConnectService } from '../../services';
import { AucWrongNetworkModalData } from './interfaces';
import { AucDialogConfig, AucDialogRef } from '../../dialog';


@Component({
  selector: 'auc-wrong-network-modal',
  templateUrl: './wrong-network-modal.component.html',
  styleUrls: [ './wrong-network-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucWrongNetworkModalComponent {
  public data: AucWrongNetworkModalData;
  public disconnectBtnColor: AsColorGroup = AS_COLOR_GROUP.RED;

  constructor(
    private _config: AucDialogConfig<AucWrongNetworkModalData>,
    private _dialogRef: AucDialogRef,
    private _walletConnectService: AucWalletConnectService
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
    this._walletConnectService.disconnectWallet()
      .subscribe();

    this.onCloseClick(false);
  }
}
