export const BasicDialogCodeTs =
  `/** Don't forget import { AucDialogModule, ModalsModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  AUC_WRONG_NETWORK_APPEARANCE,
  AucDialogService,
  AucTransferModalComponent,
  AucTransferModalData,
  AucWrongNetworkModalComponent,
  AucWrongNetworkModalData
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: [ './basic-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicDialogComponent {

  constructor(private dialogService: AucDialogService) {
  }

  showTransferModal(): void {
    const data: AucTransferModalData = {
      header: 'Transfer',
      symbol: 'USDT',
      allowance: '1000000000000000000',
      max: '10000000000000000000',
      approveButton: 'Approve',
      approvingButton: 'Approving...',
      confirmButton: 'Transfer',
      approve: () => {
        return Promise.resolve();
      },
      confirm: () => {
        return Promise.resolve();
      }
    };

    const ref = this.dialogService.open<AucTransferModalComponent, AucTransferModalData>(AucTransferModalComponent,
      {
        data,
        dialogClass: 'custom-transfer-dialog',
      });

    ref.afterOpened.subscribe(result => {
      console.log('Transfer Dialog opened: ', result);
    });

    ref.afterClosed.subscribe(result => {
      console.log('Transfer Dialog closed: ', result);
    });
  }

  showWrongNetworkModal(): void {
    const data: AucWrongNetworkModalData = {
      header: 'WRONG NETWORK',
      message: 'Looks like you connected to unsupported network. Change network to Mainnet.',
      chainId: '156',
      switchLabel: 'Switch label',
      appearance: AUC_WRONG_NETWORK_APPEARANCE.SWITCH
    };

    const ref = this.dialogService.open<AucWrongNetworkModalComponent, AucWrongNetworkModalData>(
      AucWrongNetworkModalComponent,
      {
        data,
        width: '100%',
        maxWidth: '420px',
        dialogClass: 'custom-wrong-network-dialog',
      }
    );

    ref.afterOpened.subscribe(result => {
      console.log('Wrong network dialog opened: ', result);
    });

    ref.afterClosed.subscribe(result => {
      console.log('Wrong network dialog opened: ', result);
    });
  }

}
`;
