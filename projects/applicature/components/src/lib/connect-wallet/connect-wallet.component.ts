import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';

import { AccountData, AccountOption } from '../account-button/account-button.component';
import { TransactionStatus } from '../enums';
import { generateJazzicon, normalizeBalance } from '../helpers';
import { NetworkOption } from '../interfaces';
import { AccountModalComponent, AccountModalData } from '../modals';
import { TransactionService } from '../services/transaction.service';
import { WalletConnectService } from '../services/wallet-connect.service';
import { ApplicatureDialogService } from '../applicature-dialog';

export type AppearanceType = 'default' | 'icon' | 'button';

@Component({
  selector: 'applicature-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWalletComponent implements OnInit, OnDestroy {
  @Input()
  public appearance: AppearanceType = 'button';

  @Input()
  public disabled: boolean = false;

  @Input()
  public showBalance: boolean = false;

  @Input()
  public showTransactions: boolean = false;

  @Input()
  public showNetworkOptions: boolean = false;

  @Input()
  public networkOptions!: NetworkOption[];

  @Input()
  public account!: AccountData;

  @Input()
  public accountOptions!: AccountOption[];

  @Output('onConnect')
  public onConnectWalletEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('onDisconnect')
  public onDisconnectWalletEmitter: EventEmitter<any> = new EventEmitter<any>();

  public accountAddress: string;
  public identicon: HTMLDivElement;
  public isConnected: boolean = false;
  public hasFailedTx: boolean = false;
  public hasPendingTx: boolean = false;
  public txCount: number = 0;
  public balance$: Observable<string | null>;

  private _sub: Subscription = new Subscription();

  constructor(
    private _dialogService: ApplicatureDialogService,
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    private _transactionService: TransactionService,
    private _walletConnectService: WalletConnectService,
  ) {
    this._sub.add(
      this._walletConnectService.accountsChanged$
        .subscribe((accounts) => {
          this.accountAddress = accounts?.length && accounts[0];
          this.isConnected = Boolean(this.accountAddress);

          if (this.isConnected) {
            this.identicon = generateJazzicon(this.accountAddress);
          }

          this._cdr.markForCheck();
        }),
    );
  }

  public ngOnInit(): void {
    this.balance$ = this._walletConnectService.balanceChanged$
      .pipe(
        map((balance) => normalizeBalance(balance))
      );

    this._sub.add(
      this._transactionService.transactionsChanged$
        .subscribe((transactions) => {
          this.txCount = transactions.filter((tx) => {
            return tx.status === TransactionStatus.Fail && !tx.viewed;
          }).length;

          this.hasFailedTx = this.txCount > 0;

          if (!this.hasFailedTx) {
            this.txCount = transactions.filter((tx) => {
              return tx.status === TransactionStatus.Pending;
            }).length;

            this.hasPendingTx = this.txCount > 0;
          }

          this._cdr.markForCheck();
        }),
    );
  }

  public ngOnDestroy(): void {
    if (typeof this._sub.unsubscribe === 'function') {
      this._sub.unsubscribe();
    }
  }

  public onAccountButtonClick(): void {
    if (this.disabled) {
      return;
    }

    const data: AccountModalData = {
      header: 'Account',
      change: () => {
        modal.close();

        this.onConnectWalletClick();
      },
      disconnect: () => {
        this.onDisconnectWalletClick();

        modal.close();
      },
    };

    const modal = this._dialogService.open<AccountModalComponent, AccountModalData>(AccountModalComponent, {
      data,
      dialogClass: 'applicature-dialog',
    });
  }

  public async onConnectWalletClick(): Promise<void> {
    if (this.disabled) {
      return;
    }

    const isConnected = await this._walletConnectService.connectWallet();

    this.onConnectWalletEmitter.emit(isConnected);
  }

  public async onDisconnectWalletClick(): Promise<void> {
    if (this.disabled) {
      return;
    }

    await this._walletConnectService.disconnectWallet();

    this.onDisconnectWalletEmitter.emit();
  }
}
