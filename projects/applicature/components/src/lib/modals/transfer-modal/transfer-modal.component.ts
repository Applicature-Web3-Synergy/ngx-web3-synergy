import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { normalizeBalance, toBN } from '../../helpers';
import { TransactionService } from '../../services/transaction.service';
import { WalletConnectService } from '../../services/wallet-connect.service';
import { TRANSFER_STEPS } from './enums';
import { TransferModalData } from './interfaces';
import { TransactionStep } from './types';
import { ApplicatureDialogConfig, ApplicatureDialogRef } from '../../applicature-dialog';


@Component({
  selector: 'applicature-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: [ './transfer-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferModalComponent implements OnInit, OnDestroy {
  public amountControl: FormControl = new FormControl();
  public currentAllowance: string = '0';
  public data: TransferModalData;

  public get currentStep(): TransactionStep {
    return this._currentStep;
  }

  private _currentStep: TransactionStep = TRANSFER_STEPS.APPROVE;

  private _sub: Subscription = new Subscription();

  constructor(
    private _config: ApplicatureDialogConfig<TransferModalData>,
    private _dialogRef: ApplicatureDialogRef,
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: WalletConnectService,
    private _transactionService: TransactionService,
  ) {
    this.data = this._config.data;
  }

  public ngOnInit(): void {
    this.currentAllowance = normalizeBalance(this.data.allowance);

    this.amountControl.valueChanges
      .subscribe((value) => {
        if (toBN(value).gt(0) && toBN(value).lte(this.currentAllowance)) {
          this._currentStep = TRANSFER_STEPS.CONFIRM;
        } else {
          this._currentStep = TRANSFER_STEPS.APPROVE;
        }

        this._cdr.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public onCloseClick(): void {
    this._dialogRef.close();
  }

  public onApproveClick(): void {
    this.data.approve().then(() => {
      this.currentAllowance = this.amountControl.value;

      this._currentStep = TRANSFER_STEPS.CONFIRM;

      this._cdr.markForCheck();
    });
  }

  public onConfirmClick(): void {
    this.data.confirm().then(() => {
      this._dialogRef.close();
    });
  }
}
