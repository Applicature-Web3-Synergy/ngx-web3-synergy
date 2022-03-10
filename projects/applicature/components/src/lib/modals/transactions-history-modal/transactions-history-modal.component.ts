import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { EtherscanTransactionLocalStorage } from '../../interfaces';
import { TransactionService } from '../../services/transaction.service';
import { RecentTransactionsModalData } from './interfaces';
import { ApplicatureDialogConfig, ApplicatureDialogRef } from '../../applicature-dialog';


@Component({
  selector: 'applicature-transactions-history-modal',
  templateUrl: './transactions-history-modal.component.html',
  styleUrls: [ './transactions-history-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsHistoryModalComponent implements OnDestroy {
  public transactions$: Observable<EtherscanTransactionLocalStorage[]>;
  public data: RecentTransactionsModalData;

  constructor(
    private _config: ApplicatureDialogConfig<RecentTransactionsModalData>,
    private _dialogRef: ApplicatureDialogRef,
    private _transactionService: TransactionService
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
