import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { aucNormalizeBalance, aucToBN } from '../../helpers';
import { AucConnectionState, AucWalletConnectService } from '../../services';
import { AUC_TRANSFER_STEPS } from './enums';
import { AucTransferModalData } from './interfaces';
import { AucTransactionStep } from './types';
import { AucDialogConfig, AucDialogRef } from '../../dialog';
import { AucTransactionService } from '../../transactions';


@Component({
  selector: 'auc-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: [ './transfer-modal.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AucTransferModalComponent implements OnInit, OnDestroy {
  public amountControl: FormControl = new FormControl();
  public currentAllowance: string = '0';
  public data: AucTransferModalData;

  public get currentStep(): AucTransactionStep {
    return this._currentStep;
  }

  private _currentStep: AucTransactionStep = AUC_TRANSFER_STEPS.APPROVE;

  private _sub: Subscription = new Subscription();

  constructor(
    private _config: AucDialogConfig<AucTransferModalData>,
    private _dialogRef: AucDialogRef,
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: AucWalletConnectService,
    private _transactionService: AucTransactionService,
  ) {
    this.data = this._config.data;
  }

  public ngOnInit(): void {
    const connectionState: AucConnectionState = this._walletConnectService.connectionState;
    this.currentAllowance = aucNormalizeBalance(connectionState?.state?.network, this.data.allowance);

    this.amountControl.valueChanges
      .subscribe((value) => {
        if (aucToBN(value).gt(0) && aucToBN(value).lte(this.currentAllowance)) {
          this._currentStep = AUC_TRANSFER_STEPS.CONFIRM;
        } else {
          this._currentStep = AUC_TRANSFER_STEPS.APPROVE;
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

      this._currentStep = AUC_TRANSFER_STEPS.CONFIRM;

      this._cdr.markForCheck();
    });
  }

  public onConfirmClick(): void {
    this.data.confirm().then(() => {
      this._dialogRef.close();
    });
  }
}
