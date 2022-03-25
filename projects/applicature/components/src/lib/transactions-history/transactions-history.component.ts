import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AS_COLOR_GROUP } from '@applicature/styles';

import { AUC_TRANSACTION_STATUS } from '../enums';
import { AucRecentTransactionsModalData, AucTransactionsHistoryModalComponent } from '../modals';
import { AucDialogService } from '../dialog';
import { AUC_BUTTON_APPEARANCE } from '../button';
import { AucTransactionService } from '../services';


@Component({
  selector: 'auc-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: [ './transactions-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucTransactionsHistoryComponent implements OnInit {
  /**
   * {@link disabled} - It's an `@Input()` parameter.
   * Whether the button is disabled.
   * This is an optional parameter. The default value is false.
   */
  @Input()
  public disabled: boolean = false;

  public hasFailedTx: boolean = false;
  public hasPendingTx: boolean = false;
  public txCount: number = 0;
  public COLORS = AS_COLOR_GROUP;
  public BTN_APPEARANCE = AUC_BUTTON_APPEARANCE;

  private _sub: Subscription = new Subscription();

  constructor(
    private _dialogService: AucDialogService,
    private _cdr: ChangeDetectorRef,
    private _transactionService: AucTransactionService
  ) {
  }

  public ngOnInit(): void {
    this._sub.add(
      this._transactionService.transactionsChanged$
        .subscribe((transactions) => {
          this.txCount = transactions.filter((tx) => {
            return tx.status === AUC_TRANSACTION_STATUS.FAIL && !tx.viewed;
          }).length;

          this.hasFailedTx = this.txCount > 0;

          if (!this.hasFailedTx) {
            this.txCount = transactions.filter((tx) => {
              return tx.status === AUC_TRANSACTION_STATUS.PENDING;
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
      dialogClass: 'auc-recent-transactions-dialog'
    };

    this._dialogService.open<AucTransactionsHistoryModalComponent, AucRecentTransactionsModalData>(
      AucTransactionsHistoryModalComponent,
      config
    );
  }
}
