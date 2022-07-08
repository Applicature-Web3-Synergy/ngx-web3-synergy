export const CustomTransactionHistoryCodeTs =
  `/** Don't forget import { W3sTransactionsModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  W3sDialogService,
  W3sRecentTransactionsModalData,
  W3sTransactionsHistoryModalComponent
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-custom-transaction-history',
  templateUrl: './custom-transaction-history.component.html',
  styleUrls: [ './custom-transaction-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTransactionHistoryComponent {
  constructor(private dialogService: W3sDialogService) {
  }

  showTransactions(): void {
    const config = {
      data: {
        header: 'Recent transactions'
      },
      dialogClass: 'w3s-recent-transactions-dialog',
      width: '100%',
      maxWidth: '600px',
      overlay: {
        hasOverlay: true,
        closeByClick: false,
        overlayClass: 'custom-overlay-class',
        transparent: false,
      }
    };

    const transactionDialogRef = this.dialogService.open<W3sTransactionsHistoryModalComponent, W3sRecentTransactionsModalData>(
      W3sTransactionsHistoryModalComponent,
      config
    );

    transactionDialogRef.afterOpened
      .subscribe((evt) => {
        console.log('Transactions dialog opened: ', evt);
      });

    transactionDialogRef.afterClosed
      .subscribe((evt) => {
        console.log('Transactions dialog closed.', evt);
      });
  }
}
`;
