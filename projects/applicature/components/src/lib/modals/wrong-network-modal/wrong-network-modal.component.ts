import {
  ChangeDetectionStrategy,
  Component,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WalletConnectService } from '../../services/wallet-connect.service';

export interface WrongNetworkModalData {
  header: string;
  message: string;
  chainId: string;
  switchLabel: string;
  appearance: 'disconnect' | 'switch' | 'none';
}

@Component({
  selector: 'applicature-wrong-network-modal',
  templateUrl: './wrong-network-modal.component.html',
  styleUrls: ['./wrong-network-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrongNetworkModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: WrongNetworkModalData,
    private _walletConnectService: WalletConnectService,
    private _matDialogRef: MatDialogRef<WrongNetworkModalComponent, boolean>
  ) {
  }

  public onCloseClick(value: boolean = false): void {
    this._matDialogRef.close(value);
  }

  public onSwitchNetworkClick(): void {
    this.onCloseClick(true);
  }

  public onDisconnectClick(): void {
    this._walletConnectService.disconnectWallet();

    this.onCloseClick(false);
  }
}
