import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, distinctUntilChanged, filter, finalize, Subject, takeUntil, throwError, timer } from 'rxjs';

import { MAX_ALLOWANCE } from '../../constants';
import { TransferTokenModalData } from '../../interfaces';

@Component({
  selector: 'lib-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferModalComponent implements OnInit, OnDestroy {
  public transferForm: FormGroup;
  public approved: boolean = false;
  public isApproving: boolean = false;
  public allowanceValue: number = 0;

  private $unsubscribe: Subject<void> = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TransferTokenModalData,
    private dialogRef: MatDialogRef<TransferModalComponent, boolean>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.transferForm = this.fb.group({
      price: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.allowanceValue = this.data?.currentAllowance ? this.data.currentAllowance : this.allowanceValue;
    this.approved = !!this.allowanceValue;

    if (this.allowanceValue) {
      this.transferForm.get('price').valueChanges
        .pipe(
          distinctUntilChanged(),
          filter(value => !!value),
          takeUntil(this.$unsubscribe)
        )
        .subscribe(priceVal => this.approved = this.allowanceValue >= Number(priceVal));
    }
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  public setMaxAllowance(): void {
    if (!this.transferForm.disabled) {
      this.transferForm.get('price')?.setValue(MAX_ALLOWANCE > this.allowanceValue ? MAX_ALLOWANCE : this.allowanceValue);
    }
  }

  public isAllowed(): boolean {
    return !!(this.allowanceValue && !this.transferForm.disabled);
  }

  public setAllowedAmount(): void {
    this.transferForm.get('price')?.setValue(this.allowanceValue);
  }

  public approve(): void {
    this.isApproving = true;
    const amountValue = this.transferForm.get('price')?.value;
    this.transferForm.disable();
    const source = timer(1200);

    // ToDo: Add transfer approval logic
    // ToDo: Update next code-block with Approval function implementation and remove "const source = ...". Next code is just for demo.
    source
      .pipe(
        catchError(error => {
          this.transferForm.enable();

          return throwError(error);
        }),
        finalize(() => {
          this.isApproving = false;
          this.cdr.markForCheck();
        }),
        takeUntil(this.$unsubscribe)
      )
      .subscribe(() => {
        this.approved = true;
        this.allowanceValue = (this.allowanceValue >= Number(amountValue)) ? this.allowanceValue : Number(amountValue);
        // ToDo: Next line for the testing case when a user has set allowance, to show "Current Allowance" when open dialog next time, no need with real data.
        localStorage.setItem('allowanceVal', this.allowanceValue.toString());
      });
  }

  public transferTokens(): void {
    if (!this.approved) {
      return;
    }

    // ToDo: Add Token Transfer logic here or just replace next code with line: this.dialogRef.close(true);
    const source = timer(600);
    source
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => this.dialogRef.close(true));
  }
}
