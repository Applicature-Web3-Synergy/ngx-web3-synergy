import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { w3sNormalizeBalance, w3sToBN, BaseSubscriber } from '../../helpers';
import { W3sWalletConnectService } from '../../connect';
import { W3S_TRANSFER_STEPS } from './enums';
import { W3sTransferModalData } from './interfaces';
import { W3sTransactionStep } from './types';
import { W3sDialogConfig, W3sDialogRef } from '../../dialog';
import { W3sTransactionService } from '../../transactions';


@Component({
  selector: 'w3s-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class W3sTransferModalComponent extends BaseSubscriber implements OnInit {
  public amountControl: FormControl = new FormControl();
  public currentAllowance = '0';
  public data: W3sTransferModalData;
  /** @internal */
  public STEPS = W3S_TRANSFER_STEPS;
  public isPendingApproval = false;
  public isPendingConfirm = false;
  public disabledApprove = false;

  public get currentStep(): W3sTransactionStep {
    return this._currentStep;
  }

  private _currentStep: W3sTransactionStep = W3S_TRANSFER_STEPS.APPROVE;

  constructor(
    private _config: W3sDialogConfig<W3sTransferModalData>,
    private _dialogRef: W3sDialogRef,
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: W3sWalletConnectService,
    private _transactionService: W3sTransactionService,
  ) {
    super();
    this.data = this._config.data;
  }

  public ngOnInit(): void {
    this._walletConnectService.chain$
      .pipe(
        takeUntil(this.notifier)
      )
      .subscribe((chainId: string) => {
        if (!chainId) {
          this.currentAllowance = '0';

          return;
        }

        this.currentAllowance = w3sNormalizeBalance(+chainId, this.data.allowance);
      });

    if (this.amountControl.value === null) {
      this.disabledApprove = true;
    }

    this.amountControl.valueChanges
      .pipe(takeUntil(this.notifier))
      .subscribe((value) => {
        value === '0' || !value.length ? this.disabledApprove = true : this.disabledApprove = false;

        if (w3sToBN(value).gt(0) && w3sToBN(value).lte(this.currentAllowance)) {
          this._currentStep = W3S_TRANSFER_STEPS.CONFIRM;
        } else {
          this._currentStep = W3S_TRANSFER_STEPS.APPROVE;
        }

        this._cdr.markForCheck();
      });
  }

  public onCloseClick(): void {
    this._dialogRef.close();
  }

  public onApproveClick(): void {
    this.isPendingApproval = true;

    this.data.approve(w3sToBN(this.amountControl.value)).then(() => {
      this.currentAllowance = this.amountControl.value;
      this.isPendingApproval = false;

      this._currentStep = W3S_TRANSFER_STEPS.CONFIRM;
      this._cdr.markForCheck();
    }).catch(error => {
      console.error(`Approve ${error}`);

      this.isPendingConfirm = false;
    });
  }

  public onConfirmClick(): void {
    this.isPendingConfirm = true;

    this.data.confirm(w3sToBN(this.amountControl.value)).then(() => {
      this.isPendingConfirm = false;
      this._dialogRef.close();
    });
  }
}
