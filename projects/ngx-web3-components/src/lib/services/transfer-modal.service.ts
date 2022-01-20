import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { TRANSFER_TOKEN_MODAL_DATA } from '../constants';
import { TransferTokenModalData } from '../interfaces';
import { TransferModalComponent } from '../modals/transfer-modal/transfer-modal.component';

@Injectable()
export class TransferModalService {

  constructor(private matDialog: MatDialog) { }

  public openTransferModal(): Observable<boolean> {
    const data: TransferTokenModalData = TRANSFER_TOKEN_MODAL_DATA;

    // ToDo: Next line for the testing case when a user has set allowance, to show "Current Allowance" when open dialog next time, no need it with real data.
    data.currentAllowance = localStorage.getItem('allowanceVal') ?
      Number(localStorage.getItem('allowanceVal')) : data.currentAllowance;

    return this.matDialog.open(TransferModalComponent, {
      width: '420px',
      panelClass: ['custom-mat-dialog', 'no-indents'],
      data
    }).afterClosed();
  }
}
