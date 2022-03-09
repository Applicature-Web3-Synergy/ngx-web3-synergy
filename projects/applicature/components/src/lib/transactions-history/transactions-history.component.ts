import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TransactionStatus } from '../enums';
import { RecentTransactionsModalData, TransactionsHistoryModalComponent } from '../modals';
import { TransactionService } from '../services/transaction.service';
import { ApplicatureDialogService } from '../applicature-dialog';

@Component({
  selector: 'applicature-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: [ './transactions-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsHistoryComponent implements OnInit {
  @Input()
  public disabled: boolean = false;

  public hasFailedTx: boolean = false;
  public hasPendingTx: boolean = false;
  public txCount: number = 0;

  private _sub: Subscription = new Subscription();

  constructor(
    private _dialogService: ApplicatureDialogService,
    private _cdr: ChangeDetectorRef,
    private _transactionService: TransactionService
  ) {
  }

  public ngOnInit(): void {
    this._sub.add(
      this._transactionService.transactionsChanged$
        .subscribe((transactions) => {
          this.txCount = transactions.filter((tx) => {
            return tx.status === TransactionStatus.Fail && !tx.viewed;
          }).length;

          this.hasFailedTx = this.txCount > 0;

          if (!this.hasFailedTx) {
            this.txCount = transactions.filter((tx) => {
              return tx.status === TransactionStatus.Pending;
            }).length;

            this.hasPendingTx = this.txCount > 0;
          }

          this._cdr.markForCheck();
        })
    );
  }

  public onTransactionsClick(): void {
    if (this.disabled) {
      return;
    }

    const config = {
      data: {
        header: 'Recent transactions'
      },
      dialogClass: 'applicature-dialog'
    };

    this._dialogService.open<TransactionsHistoryModalComponent, RecentTransactionsModalData>(TransactionsHistoryModalComponent, config);
  }
}
