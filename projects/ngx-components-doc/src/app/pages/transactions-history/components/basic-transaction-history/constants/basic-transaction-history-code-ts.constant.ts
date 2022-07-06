export const BasicTransactionHistoryCodeTs =
`/** Don't forget import { AucTransactionsModule } from '@applicature/ngx-web3-synergy'; to your module */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeUntil, takeWhile } from 'rxjs';

import {
  AUC_TRANSACTION_STATUS,
  AucTransactionService,
  AucWalletConnectService,
  BaseSubscriber
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-transaction-history',
  templateUrl: './basic-transaction-history.component.html',
  styleUrls: [ './basic-transaction-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicTransactionHistoryComponent extends BaseSubscriber {
  TRANSACTION_STATUS = AUC_TRANSACTION_STATUS;
  currentChainId: string;

  constructor(private cdr: ChangeDetectorRef,
              private walletConnectService: AucWalletConnectService,
              private transactionService: AucTransactionService) {
    super();

    this.walletConnectService.chain$
      .pipe(takeUntil(this.notifier))
      .subscribe((chainId: string) => {
        this.currentChainId = chainId;
        this.cdr.markForCheck();
      })
  }

  addTransaction(status: AUC_TRANSACTION_STATUS = AUC_TRANSACTION_STATUS.SUCCESS): void {
    this.transactionService.saveTransaction(
      {
        chainId: this.currentChainId,
        name: 'Transfer ' + this.currentChainId, // Transaction name,
        hash: '0x...' + Math.random(), // transaction hash, will disappear is status pending.
        status,
        viewed: false
      }
    )
      .pipe(
        takeWhile((res) => res.status !== AUC_TRANSACTION_STATUS.PENDING),
      )
      .subscribe(res => {
        console.log('Transaction: ', res);
      });
  }

  clearTransactions(): void {
    this.transactionService.clearTransactions();
  }
}
`;
