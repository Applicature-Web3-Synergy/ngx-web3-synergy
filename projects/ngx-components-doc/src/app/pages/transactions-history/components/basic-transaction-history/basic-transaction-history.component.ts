/** Don't forget import { AucTransactionsModule } from '@applicature/components'; to your module */

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AUC_CHAIN_ID, AUC_TRANSACTION_STATUS, AucTransactionService } from '@applicature/components';


@Component({
  selector: 'doc-basic-transaction-history',
  templateUrl: './basic-transaction-history.component.html',
  styleUrls: [ './basic-transaction-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicTransactionHistoryComponent {
  TRANSACTION_STATUS = AUC_TRANSACTION_STATUS;

  constructor(private transactionService: AucTransactionService) {}

  addTransaction(status: AUC_TRANSACTION_STATUS = AUC_TRANSACTION_STATUS.SUCCESS): void {
    this.transactionService.saveTransaction(
      AUC_CHAIN_ID.POLYGON_TESTNET,
      'Transfer', // Transaction name
      `0x...${Math.random()}`, // transaction hash
      status
    )
  }

  clearTransactions(): void {
    this.transactionService.clearTransactions();
  }
}
