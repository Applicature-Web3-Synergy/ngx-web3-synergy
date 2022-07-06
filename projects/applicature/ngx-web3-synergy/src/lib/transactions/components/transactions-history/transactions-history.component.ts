import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AS_COLOR_GROUP } from '@applicature/styles';

import { AucDialogService } from '../../../dialog';
import { AUC_BUTTON_APPEARANCE } from '../../../button';
import { AucRecentTransactionsModalData, AucTransactionsHistoryModalComponent } from '../transactions-history-modal';
import { AucTransactionService } from '../../services';
import { AucTransactionItem } from '../../interfaces';
import { AUC_TRANSACTION_STATUS } from '../../enums';
import { BaseSubscriber } from '../../../helpers';


@Component({
  selector: 'auc-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: [ './transactions-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucTransactionsHistoryComponent extends BaseSubscriber implements OnInit {
  /**
   * Whether the button is disabled. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input()
  public disabled: boolean = false;

  /** @internal */
  public hasFailedTx = false;

  /** @internal */
  public hasPendingTx = false;

  /** @internal */
  public txCount = 0;

  /** @internal */
  public COLORS = AS_COLOR_GROUP;

  /** @internal */
  public BTN_APPEARANCE = AUC_BUTTON_APPEARANCE;

  constructor(
    private _dialogService: AucDialogService,
    private _cdr: ChangeDetectorRef,
    private _transactionService: AucTransactionService
  ) {
    super();
  }

  /** @internal */
  public ngOnInit(): void {
    this._transactionService.transactionsChanged$
      .pipe(takeUntil(this.notifier))
      .subscribe((transactions: AucTransactionItem[]) => {
        this.txCount = transactions.filter((tx: AucTransactionItem) => {
          return tx.status === AUC_TRANSACTION_STATUS.FAIL && !tx.viewed;
        }).length;

        this.hasFailedTx = this.txCount > 0;

        if (!this.hasFailedTx) {
          this.txCount = transactions.filter((tx: AucTransactionItem) => {
            return tx.status === AUC_TRANSACTION_STATUS.PENDING;
          }).length;

          this.hasPendingTx = this.txCount > 0;
        }

        this._cdr.detectChanges();
      });
  }

  /** Opens Recent Transaction Dialog. */
  public onTransactionsClick(): void {
    if (this.disabled) {
      return;
    }

    const config = {
      data: {
        header: 'Recent transactions'
      },
      dialogClass: 'auc-recent-transactions-dialog',
      width: '100%',
      maxWidth: '372px',
      overlay: {
        closeByClick: true
      }
    };

    this._dialogService.open<AucTransactionsHistoryModalComponent, AucRecentTransactionsModalData>(
      AucTransactionsHistoryModalComponent,
      config
    );
  }
}
