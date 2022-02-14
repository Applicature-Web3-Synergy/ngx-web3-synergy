import {
  ChangeDetectionStrategy,
  Component,
  Inject, OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EtherscanTransactionLocalStorage } from '../../interfaces';
import { TransactionService } from '../../services/transaction.service';

export interface RecentTransactionsModalData {
  header: string;
}

@Component({
  selector: 'applicature-transactions-history-modal',
  templateUrl: './transactions-history-modal.component.html',
  styleUrls: ['./transactions-history-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsHistoryModalComponent implements OnDestroy {
  public transactions$: Observable<EtherscanTransactionLocalStorage[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: RecentTransactionsModalData,
    private _transactionService: TransactionService,
    private _matDialogRef: MatDialogRef<TransactionsHistoryModalComponent, void>
  ) {
    this.transactions$ = this._transactionService.transactionsChanged$;
  }

  public onCloseClick(): void {
    this._matDialogRef.close();
  }

  public ngOnDestroy(): void {
    this._transactionService.markAsViewed();
  }
}
