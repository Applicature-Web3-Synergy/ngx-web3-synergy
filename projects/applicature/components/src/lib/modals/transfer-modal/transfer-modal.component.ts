import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import BigNumber from 'bignumber.js';
import { startWith, Subscription } from 'rxjs';
import { fromWei, normalize, normalizeBalance, normalizeBN, toBN } from '../../helpers';
import { TransactionService } from '../../services/transaction.service';
import { WalletConnectService } from '../../services/wallet-connect.service';

export interface TransferModalData {
  header: string;
  symbol: string;
  allowance: BigNumber.Value;
  max: BigNumber.Value | any;
  approve: () => Promise<void>;
  confirm: () => Promise<void>;
  approveButton: string;
  approvingButton: string;
  confirmButton: string;
}

const enum Step {
  Approve = 1,
  Confirm = 2,
}

@Component({
  selector: 'applicature-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferModalComponent implements OnInit, OnDestroy {
  public amountControl: FormControl = new FormControl();
  public currentAllowance: string = '0';

  public get currentStep(): Step {
    return this._currentStep;
  }

  private _currentStep: Step = Step.Approve;

  private _sub: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: TransferModalData,
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: WalletConnectService,
    private _transactionService: TransactionService,
    private _matDialogRef: MatDialogRef<TransferModalComponent, void>
  ) {
  }

  public ngOnInit(): void {
    this.currentAllowance = normalizeBalance(this.data.allowance);

    this.amountControl.valueChanges
      .subscribe((value) => {
        if (toBN(value).gt(0) && toBN(value).lte(this.currentAllowance)) {
          this._currentStep = Step.Confirm;
        } else {
          this._currentStep = Step.Approve;
        }

        this._cdr.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public onCloseClick(): void {
    this._matDialogRef.close();
  }

  public onApproveClick(): void {
    this.data.approve().then(() => {
      this.currentAllowance = this.amountControl.value;

      this._currentStep = Step.Confirm;

      this._cdr.markForCheck();
    });
  }

  public onConfirmClick(): void {
    this.data.confirm().then(() => {
      this._matDialogRef.close();
    });
  }
}
