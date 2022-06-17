import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { aucNormalizeBalance, aucToBN, BaseSubscriber } from '../../helpers';
import { AucWalletConnectService } from '../../connect';
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
export class AucTransferModalComponent extends BaseSubscriber implements OnInit {
  public amountControl: FormControl = new FormControl();
  public currentAllowance: string = '0';
  public data: AucTransferModalData;
  /** @internal */
  public STEPS = AUC_TRANSFER_STEPS;

  public get currentStep(): AucTransactionStep {
    return this._currentStep;
  }

  private _currentStep: AucTransactionStep = AUC_TRANSFER_STEPS.APPROVE;

  constructor(
    private _config: AucDialogConfig<AucTransferModalData>,
    private _dialogRef: AucDialogRef,
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: AucWalletConnectService,
    private _transactionService: AucTransactionService,
  ) {
    super();
    this.data = this._config.data;
  }

  public ngOnInit(): void {
    this._walletConnectService.chainChanged$
      .pipe(
        takeUntil(this.notifier)
      )
      .subscribe((chainId: string) => {
        if (!chainId) {
          this.currentAllowance = '0';

          return;
        }

        this.currentAllowance = aucNormalizeBalance(+chainId, this.data.allowance);
      });

    this.amountControl.valueChanges
      .pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        if (aucToBN(value).gt(0) && aucToBN(value).lte(this.currentAllowance)) {
          this._currentStep = AUC_TRANSFER_STEPS.CONFIRM;
        } else {
          this._currentStep = AUC_TRANSFER_STEPS.APPROVE;
        }

        this._cdr.markForCheck();
      });
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
