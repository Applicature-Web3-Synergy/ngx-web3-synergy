import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AS_COLOR_GROUP, AsColorGroup } from '@applicature/styles';

import { W3sWalletConnectService } from '../../connect';
import { W3sWrongNetworkModalData } from './interfaces';
import { W3sDialogConfig, W3sDialogRef } from '../../dialog';
import { BaseSubscriber } from '../../helpers';


@Component({
  selector: 'w3s-wrong-network-modal',
  templateUrl: './wrong-network-modal.component.html',
  styleUrls: [ './wrong-network-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sWrongNetworkModalComponent extends BaseSubscriber {
  public data: W3sWrongNetworkModalData;
  public disconnectBtnColor: AsColorGroup = AS_COLOR_GROUP.RED;

  constructor(
    private _config: W3sDialogConfig<W3sWrongNetworkModalData>,
    private _dialogRef: W3sDialogRef,
    private _walletConnectService: W3sWalletConnectService
  ) {
    super();
    this.data = this._config.data;
  }

  public onCloseClick(value = false): void {
    this._dialogRef.close(value);
  }

  public onSwitchNetworkClick(): void {
    this.onCloseClick(true);
  }

  public disconnectClick(): void {
    this._walletConnectService.disconnectWallet()
      .pipe(takeUntil(this.notifier))
      .subscribe();

    this.onCloseClick(false);
  }
}
