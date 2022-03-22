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

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AucAccountData, AucAccountOption } from '../renamed/account-button';
import { AUC_POSITIONS, TransactionStatus } from '../enums';
import { generateJazzicon, normalizeBalance } from '../helpers';
import { AucNetworkOption } from '../interfaces';
import { AucAccountModalComponent, AucAccountModalData } from '../renamed/modals';
import { TransactionService } from '../services/transaction.service';
import { ConnectionState, WalletConnectService } from '../services';
import { AucDialogService } from '../renamed/dialog';
import { AucDropdownConfig } from '../renamed/dropdown-menu';
import { AS_COLOR_GROUP } from '@applicature/styles';

export type AppearanceType = 'default' | 'icon' | 'button';

@Component({
  selector: 'applicature-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: [ './connect-wallet.component.scss' ],
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
  public networkOptions!: AucNetworkOption[];

  @Input()
  public account!: AucAccountData;

  @Input()
  public accountOptions!: AucAccountOption[];

  @Input() networkDropdownConfig?: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.AFTER
    }
  }

  @Input() accountDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.BEFORE
    }
  }

  @Output('onConnect')
  public onConnectWalletEmitter: EventEmitter<ConnectionState> = new EventEmitter<ConnectionState>();

  @Output('onDisconnect')
  public onDisconnectWalletEmitter: EventEmitter<void> = new EventEmitter<void>();

  public accountAddress: string;
  public identicon: HTMLDivElement;
  public isConnected: boolean = false;
  public hasFailedTx: boolean = false;
  public hasPendingTx: boolean = false;
  public txCount: number = 0;
  public balance$: Observable<string | null>;
  public COLORS = AS_COLOR_GROUP;

  private _sub: Subscription = new Subscription();

  constructor(
    private _dialogService: AucDialogService,
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

    const data: AucAccountModalData = {
      header: 'Account',
      change: () => {
        modal.close();

        this.onConnectWalletClick(true);
      },
      disconnect: () => {
        this.onDisconnectWalletClick();

        modal.close();
      },
    };

    const modal = this._dialogService.open<AucAccountModalComponent, AucAccountModalData>(AucAccountModalComponent, {
      data,
      dialogClass: 'auc-account-dialog',
    });
  }

  public onConnectWalletClick(isDisconnect: boolean = false): void {
    if (this.disabled) {
      return;
    }

    this._walletConnectService.connectWallet(isDisconnect)
      .subscribe((connectionState: ConnectionState) => {
        this.onConnectWalletEmitter.emit(connectionState);
      })
  }

  public onDisconnectWalletClick(): void {
    if (this.disabled) {
      return;
    }

    this._walletConnectService.disconnectWallet()
      .subscribe(() => {
        this.onDisconnectWalletEmitter.emit();
      });
  }

}
