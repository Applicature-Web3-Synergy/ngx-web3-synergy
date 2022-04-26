import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AS_COLOR_GROUP } from '@applicature/styles';

import { AUC_TRANSACTION_STATUS } from '../../../enums';
import { AucDialogService } from '../../../dialog';
import { AUC_BUTTON_APPEARANCE } from '../../../button';
import { AucEtherscanTransactionLocalStorage } from '../../../interfaces';
import { AucRecentTransactionsModalData, AucTransactionsHistoryModalComponent } from '../transactions-history-modal';
import { AucTransactionService } from '../../services';


@Component({
  selector: 'auc-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: [ './transactions-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucTransactionsHistoryComponent implements OnInit {
  /**
   * Whether the button is disabled. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public disabled: boolean = false;

  /** @internal */
  public hasFailedTx: boolean = false;

  /** @internal */
  public hasPendingTx: boolean = false;

  /** @internal */
  public txCount: number = 0;

  /** @internal */
  public COLORS = AS_COLOR_GROUP;

  /** @internal */
  public BTN_APPEARANCE = AUC_BUTTON_APPEARANCE;

  /** @internal */
  private _sub: Subscription = new Subscription();

  constructor(
    private _dialogService: AucDialogService,
    private _cdr: ChangeDetectorRef,
    private _transactionService: AucTransactionService
  ) {
  }

  /** @internal */
  public ngOnInit(): void {
    this._sub.add(
      this._transactionService.transactionsChanged$
        .subscribe((transactions: AucEtherscanTransactionLocalStorage[]) => {
          this.txCount = transactions.filter((tx: AucEtherscanTransactionLocalStorage) => {
            return tx.status === AUC_TRANSACTION_STATUS.FAIL && !tx.viewed;
          }).length;

          this.hasFailedTx = this.txCount > 0;

          if (!this.hasFailedTx) {
            this.txCount = transactions.filter((tx: AucEtherscanTransactionLocalStorage) => {
              return tx.status === AUC_TRANSACTION_STATUS.PENDING;
            }).length;

            this.hasPendingTx = this.txCount > 0;
          }

          this._cdr.markForCheck();
        })
    );
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
