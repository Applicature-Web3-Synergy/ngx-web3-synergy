/** Don't forget import { W3sTransactionsModule } from '@applicature/ngx-web3-synergy'; to your module */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeUntil, takeWhile } from 'rxjs';

import {
  W3S_TRANSACTION_STATUS,
  W3sAddTransaction,
  W3sTransactionService,
  W3sWalletConnectService,
  BaseSubscriber
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-transaction-history',
  templateUrl: './basic-transaction-history.component.html',
  styleUrls: [ './basic-transaction-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicTransactionHistoryComponent extends BaseSubscriber {
  TRANSACTION_STATUS = W3S_TRANSACTION_STATUS;
  currentChainId: string;
  includesAdditionalLinks = false;

  constructor(private cdr: ChangeDetectorRef,
              private walletConnectService: W3sWalletConnectService,
              private transactionService: W3sTransactionService) {
    super();

    this.walletConnectService.chain$
      .pipe(takeUntil(this.notifier))
      .subscribe((chainId: string) => {
        this.currentChainId = chainId;
        this.cdr.markForCheck();
      })
  }

  addTransaction(status: W3S_TRANSACTION_STATUS = W3S_TRANSACTION_STATUS.SUCCESS): void {
    const randomHash = '0x...' + Math.random();
    const transactionToSave: W3sAddTransaction = {
      chainId: this.currentChainId,
      name: 'Transfer ' + randomHash, // Transaction name,
      hash: randomHash, // transaction hash, will disappear is status pending.
      status,
      viewed: false
    }

    if (this.includesAdditionalLinks) {
      transactionToSave.additionalLinks = [
        {
          title: 'Optional link 1',
          href: 'https://github.com/Applicature-Web3-Synergy/ngx-web3-synergy',
        },
        {
          title: 'Optional link 2',
          href: 'https://github.com/Applicature-Web3-Synergy/ngx-web3-synergy',
          ignoreTargetBlank: true
        }
      ];
    }

    this.transactionService.saveTransaction(transactionToSave)
      .pipe(
        takeWhile((res) => res.status !== W3S_TRANSACTION_STATUS.PENDING),
      )
      .subscribe(res => {
        console.log('Transaction: ', res);
      });
  }

  clearTransactions(): void {
    this.transactionService.clearTransactions();
  }
}
