import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { catchError, of } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { W3sDialogConfig, W3sDialogRef } from '../../../dialog';
import { W3sRecentTransactionsModalData } from './interfaces';
import { W3sTransactionService } from '../../services';
import { W3sTransactionItem } from '../../interfaces';
import { BaseSubscriber } from '../../../helpers';


@Component({
  selector: 'w3s-transactions-history-modal',
  templateUrl: './transactions-history-modal.component.html',
  styleUrls: [ './transactions-history-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sTransactionsHistoryModalComponent extends BaseSubscriber implements OnDestroy {
  public transactions: W3sTransactionItem[];
  public data: W3sRecentTransactionsModalData;
  public loading = true;

  constructor(
    public _cdr: ChangeDetectorRef,
    private _config: W3sDialogConfig<W3sRecentTransactionsModalData>,
    private _dialogRef: W3sDialogRef,
    private _transactionService: W3sTransactionService
  ) {
    super();

    this.data = this._config.data;

    this._transactionService.transactionsChanged$
      .pipe(
        debounceTime(200),
        catchError(() => of(null)),
        takeUntil(this.notifier)
      )
      .subscribe((transactions: W3sTransactionItem[]) => {
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
