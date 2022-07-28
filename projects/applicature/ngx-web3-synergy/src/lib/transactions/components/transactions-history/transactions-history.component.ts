import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AS_COLOR_GROUP } from '@applicature/styles';

import { W3sDialogService } from '../../../dialog';
import { W3S_BUTTON_APPEARANCE } from '../../../button';
import { W3sRecentTransactionsModalData, W3sTransactionsHistoryModalComponent } from '../transactions-history-modal';
import { W3sTransactionService } from '../../services';
import { W3sTransactionItem } from '../../interfaces';
import { W3S_TRANSACTION_STATUS } from '../../enums';
import { BaseSubscriber } from '../../../helpers';


@Component({
  selector: 'w3s-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: [ './transactions-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sTransactionsHistoryComponent extends BaseSubscriber implements OnInit {
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
  public BTN_APPEARANCE = W3S_BUTTON_APPEARANCE;

  constructor(
    private _dialogService: W3sDialogService,
    private _cdr: ChangeDetectorRef,
    private _transactionService: W3sTransactionService
  ) {
    super();
  }

  /** @internal */
  public ngOnInit(): void {
    this._transactionService.transactionsChanged$
      .pipe(takeUntil(this.notifier))
      .subscribe((transactions: W3sTransactionItem[]) => {
        this.txCount = transactions.filter((tx: W3sTransactionItem) => {
          return tx.status === W3S_TRANSACTION_STATUS.FAIL && !tx.viewed;
        }).length;

        this.hasFailedTx = this.txCount > 0;

        if (!this.hasFailedTx) {
          this.txCount = transactions.filter((tx: W3sTransactionItem) => {
            return tx.status === W3S_TRANSACTION_STATUS.PENDING;
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
      dialogClass: 'w3s-recent-transactions-dialog',
      width: '100%',
      maxWidth: '420px',
      overlay: {
        closeByClick: true
      }
    };

    this._dialogService.open<W3sTransactionsHistoryModalComponent, W3sRecentTransactionsModalData>(
      W3sTransactionsHistoryModalComponent,
      config
    );
  }
}
