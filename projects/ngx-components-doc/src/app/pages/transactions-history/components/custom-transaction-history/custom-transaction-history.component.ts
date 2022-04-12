/** Dont forget import { AucTransactionsModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  AucDialogService,
  AucRecentTransactionsModalData,
  AucTransactionsHistoryModalComponent
} from '@applicature/components';


@Component({
  selector: 'doc-custom-transaction-history',
  templateUrl: './custom-transaction-history.component.html',
  styleUrls: [ './custom-transaction-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTransactionHistoryComponent {
  constructor(private dialogService: AucDialogService) {
  }

  showTransactions(): void {
    const config = {
      data: {
        header: 'Recent transactions'
      },
      dialogClass: 'auc-recent-transactions-dialog',
      width: '100%',
      maxWidth: '600px',
      overlay: {
        hasOverlay: true,
        closeByClick: false,
        overlayClass: 'custom-overlay-class',
        transparent: false,
      }
    };

    const transactionDialogRef = this.dialogService.open<AucTransactionsHistoryModalComponent, AucRecentTransactionsModalData>(
      AucTransactionsHistoryModalComponent,
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
