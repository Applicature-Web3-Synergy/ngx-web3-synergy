import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { first } from 'rxjs';
import {
  RecentTransactionsModalComponent,
  RecentTransactionsModalData
} from '../../../modals/recent-transactions-modal/recent-transactions-modal.component';
import { TransactionService } from '../../../services';

@Component({
  selector: 'recent-transactions-button',
  templateUrl: './recent-transactions-button.component.html',
  styleUrls: ['./recent-transactions-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentTransactionsButtonComponent {
  @Input()
  public disabled: boolean = false;

  constructor(
    private _matDialog: MatDialog,
    private _transactionService: TransactionService,
  ) {
  }


  public onClick(evt: any): void {
    if (this.disabled) {
      return;
    }

    const config = new MatDialogConfig<RecentTransactionsModalData>();

    config.data = {
      header: 'Recent transactions',
    };

    config.panelClass = 'custom-mat-dialog';

    this._matDialog.open(RecentTransactionsModalComponent, config).beforeClosed()
      .pipe(first())
      .subscribe(() => this._transactionService.markAsViewed())
  }
}
