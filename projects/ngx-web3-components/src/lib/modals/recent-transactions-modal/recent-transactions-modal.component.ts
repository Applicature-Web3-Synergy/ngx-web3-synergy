import {
  ChangeDetectionStrategy,
  Component,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EtherscanTransactionLocal, TransactionService } from '../../services';

export interface RecentTransactionsModalData {
  header: string;
}

@Component({
  selector: 'recent-transactions-modal',
  templateUrl: './recent-transactions-modal.component.html',
  styleUrls: ['./recent-transactions-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentTransactionsModalComponent {
  public transactions$: Observable<EtherscanTransactionLocal[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: RecentTransactionsModalData,
    private _transactionService: TransactionService,
    private _matDialogRef: MatDialogRef<RecentTransactionsModalComponent, void>
  ) {
    this.transactions$ = this._transactionService.transactionsChanged$;
  }

  public onCloseClick(): void {
    this._matDialogRef.close();
  }
}
