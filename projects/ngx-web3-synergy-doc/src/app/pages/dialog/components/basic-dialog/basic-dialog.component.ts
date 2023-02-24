/** Don't forget import { W3sDialogModule, W3sModalsModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  W3S_WRONG_NETWORK_APPEARANCE,
  W3sDialogService,
  W3sTransferModalComponent,
  W3sTransferModalData,
  W3sWrongNetworkModalComponent,
  W3sWrongNetworkModalData
} from '@applicature/ngx-web3-synergy';
import BigNumber from 'bignumber.js';


@Component({
  selector: 'doc-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: [ './basic-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicDialogComponent {

  constructor(private dialogService: W3sDialogService) {
  }

  showTransferModal(): void {
    const data: W3sTransferModalData = {
      header: 'Transfer',
      symbol: 'USDT',
      stepAction: true,
      allowance: '1000000000000000000',
      max: '10000000000000000000',
      approveButton: 'Approve',
      approvingButton: 'Approving...',
      confirmButton: 'Transfer',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      approve: (val: BigNumber) => {
        return Promise.resolve();
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      confirm: (val: BigNumber) => {
        return Promise.resolve();
      }
    };

    const ref = this.dialogService.open<W3sTransferModalComponent, W3sTransferModalData>(W3sTransferModalComponent,
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
    const data: W3sWrongNetworkModalData = {
      header: 'WRONG NETWORK',
      message: 'Looks like you connected to unsupported network. Change network to Mainnet.',
      chainId: '156',
      switchLabel: 'Switch label',
      appearance: W3S_WRONG_NETWORK_APPEARANCE.SWITCH
    };

    const ref = this.dialogService.open<W3sWrongNetworkModalComponent, W3sWrongNetworkModalData>(
      W3sWrongNetworkModalComponent,
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
