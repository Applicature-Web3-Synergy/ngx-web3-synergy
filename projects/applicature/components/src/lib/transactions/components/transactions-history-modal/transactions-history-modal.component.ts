import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { catchError, of } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { AucDialogConfig, AucDialogRef } from '../../../dialog';
import { AucRecentTransactionsModalData } from './interfaces';
import { AucTransactionService } from '../../services';
import { AucTransactionItem } from '../../interfaces';
import { BaseSubscriber } from '../../../helpers';


@Component({
  selector: 'auc-transactions-history-modal',
  templateUrl: './transactions-history-modal.component.html',
  styleUrls: [ './transactions-history-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucTransactionsHistoryModalComponent extends BaseSubscriber implements OnDestroy {
  public transactions: AucTransactionItem[];
  public data: AucRecentTransactionsModalData;
  public loading = true;

  constructor(
    public _cdr: ChangeDetectorRef,
    private _config: AucDialogConfig<AucRecentTransactionsModalData>,
    private _dialogRef: AucDialogRef,
    private _transactionService: AucTransactionService
  ) {
    super();

    this.data = this._config.data;

    this._transactionService.transactionsChanged$
      .pipe(
        debounceTime(200),
        catchError(() => of(null)),
        takeUntil(this.notifier)
      )
      .subscribe((transactions: AucTransactionItem[]) => {
        this.loading = false;
        this.transactions = transactions ?? [];
        this._cdr.detectChanges();
      });
  }

  public onCloseClick(): void {
    this._dialogRef.close();
  }

  override ngOnDestroy(): void {
    this._transactionService.markAllAsViewed();
  }

}
