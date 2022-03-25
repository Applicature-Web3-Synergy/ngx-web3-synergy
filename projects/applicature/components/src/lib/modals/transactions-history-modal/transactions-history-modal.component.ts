import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { AucEtherscanTransactionLocalStorage } from '../../interfaces';
import { AucTransactionService } from '../../services';
import { AucRecentTransactionsModalData } from './interfaces';
import { AucDialogConfig, AucDialogRef } from '../../dialog';


@Component({
  selector: 'auc-transactions-history-modal',
  templateUrl: './transactions-history-modal.component.html',
  styleUrls: [ './transactions-history-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucTransactionsHistoryModalComponent implements OnDestroy {
  public transactions$: Observable<AucEtherscanTransactionLocalStorage[]>;
  public data: AucRecentTransactionsModalData;

  constructor(
    private _config: AucDialogConfig<AucRecentTransactionsModalData>,
    private _dialogRef: AucDialogRef,
    private _transactionService: AucTransactionService
  ) {
    this.data = this._config.data;
    this.transactions$ = this._transactionService.transactionsChanged$;
  }

  public onCloseClick(): void {
    this._dialogRef.close();
  }

  public ngOnDestroy(): void {
    this._transactionService.markAsViewed();
  }
}
