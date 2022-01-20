import { Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, finalize, Subject, takeUntil, timer } from 'rxjs';

import {
  CHAIN_ID_TO_TYPE_MAP,
  MAINNET_CHAIN_ID,
  MOCKED_TOKEN_AMOUNT,
  MOCKED_TOKEN_SYMBOL,
  MOCKED_TRANSACTION_HASH
} from '../../constants/index';
import { addressValidator } from '../../helpers/address-validator';
import { Ethereum } from '../../interfaces/index';
import { ValidationControlMessageService } from '../../services/control-message.service';
import { WalletService } from '../../services/index';

@Component({
  selector: 'lib-transfer-token',
  templateUrl: './transfer-token.component.html',
  styleUrls: ['./transfer-token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferTokenComponent implements OnDestroy {
  // ToDo: Update next variables with real data - not mocked constants!
  public tokenSymbol = MOCKED_TOKEN_SYMBOL;
  public tokenAmount = MOCKED_TOKEN_AMOUNT;
  public transactionHash: string;
  public transactionLink: string;

  public transactionAddress: string;
  public addressLink: string;
  public transferForm: FormGroup;
  public transferred = false;
  public isTransferring = false;
  public amountErrors: string[] = [];

  private $unsubscribe: Subject<void> = new Subject();
  private networkSubDomain: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private _walletService: WalletService
  ) {
    this.transferForm = this.fb.group({
      amount: [null, Validators.required],
      address: ['', [Validators.required, addressValidator({ wrongAddress: true })]]
    });
    this.subscribeOnAmount();
    this._walletService.networkChanged$
      .pipe(
        filter((networkId) => Number.isSafeInteger(networkId)),
        takeUntil(this.$unsubscribe)
      )
      .subscribe(() => {
        const { chainId } = (window as any).ethereum as Ethereum;
        this.networkSubDomain = chainId === MAINNET_CHAIN_ID ? '' : `${CHAIN_ID_TO_TYPE_MAP[chainId]}.`;
      });
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  public get addressErrorMessage(): string | null {
    for (const propertyName in this.transferForm.get('address').errors) {
      if (this.transferForm.get('address').errors.hasOwnProperty(propertyName)) {
        return ValidationControlMessageService.getValidatorErrorMessage(propertyName);
      }
    }

    return null;
  }

  public transferToken(): void {
    if (!this.transferred) {
      this.transferForm.markAllAsTouched();

      if (this.transferForm.valid) {
        this.transactionAddress = this.transferForm.get('address').value;
        this.addressLink = `https://${this.networkSubDomain}etherscan.io/address/${this.transactionAddress}`;
        // ToDo: Update next variable with real transaction hash data - not mocked constant!
        this.transactionHash = MOCKED_TRANSACTION_HASH;
        this.transactionLink = `https://${this.networkSubDomain}etherscan.io/tx/${this.transactionHash}`;

        this.isTransferring = true;

        // ToDo: Update next code with real transfer request
        const source = timer(3000);
        source
          .pipe(
            finalize(() => {
              this.isTransferring = false;
              this.cdr.markForCheck();
            }),
            takeUntil(this.$unsubscribe)
          )
          .subscribe(() => this.transferred = true);
      } else if (this.transferForm.get('amount').invalid) {
        this.amountErrors = ['This is Required Field.'];
        this.cdr.markForCheck();
      }
    } else {
      // ToDo: add route to the homepage & remove next code

      this.amountErrors = [];
      this.transferForm.reset();
      this.transferred = false;
      this.isTransferring = false;
      this.cdr.markForCheck();
    }
  }

  private subscribeOnAmount(): void {
    this.transferForm?.get('amount')?.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.$unsubscribe)
      )
      .subscribe(value => {
        if (value && this.amountErrors.length) {
          this.amountErrors = [];
          this.cdr.markForCheck();
        } else if (!value && !this.amountErrors.length && this.transferForm.get('amount').touched) {
          this.amountErrors = ['This is Required Field.'];
          this.cdr.markForCheck();
        }
      });
  }
}
