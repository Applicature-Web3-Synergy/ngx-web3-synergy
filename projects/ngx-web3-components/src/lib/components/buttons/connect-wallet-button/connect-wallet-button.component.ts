import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable, Subscription } from 'rxjs';
import { TransactionStatus } from '../../../enums';
import { generateJazzicon, normalizeBalance } from '../../../helpers';
import { Ethereum, NetworkOption } from '../../../interfaces';

import { AccountModalComponent } from '../../../modals/account-modal/account-modal.component';
import { TransactionService, WalletService } from '../../../services';
import { AccountOption } from '../account-popover/account-popover.component';

export type AppearanceType = 'default' | 'icon' | 'button';

@Component({
  selector: 'connect-wallet-button',
  templateUrl: './connect-wallet-button.component.html',
  styleUrls: ['./connect-wallet-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectWalletButtonComponent implements OnInit, OnDestroy {
  @Input()
  public appearance: AppearanceType = 'button';

  @Input()
  public disabled: boolean = false;

  @Input()
  public fullWidth: boolean = false;

  @Input()
  public showBalance: boolean = false;

  @Input()
  public showTxButton: boolean = true;

  @Input()
  public networkOptions: NetworkOption[] = [];

  @Input()
  public showNetworkOptions: boolean = false;

  @Input()
  public withIcon: boolean = true;

  @Input()
  public accountName!: string;

  @Input()
  public accountIcon!: string;

  @Input()
  public accountOptions!: AccountOption[];

  @Output('connectWalletChange')
  public connectWalletEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('accountOptionChange')
  public accountOptionEmitter: EventEmitter<AccountOption> = new EventEmitter<AccountOption>();

  public accountAddress: string;
  public identicon: HTMLDivElement;
  public isConnected: boolean = false;
  public hasFailedTx: boolean = false;
  public hasPendingTx: boolean = false;
  public balance$: Observable<string>;
  public wrongNetwork$: Observable<boolean>;

  private _sub: Subscription = new Subscription();

  constructor(
    private _matDialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _walletService: WalletService,
    private _transactionService: TransactionService,
  ) {
    this._sub.add(
      this._walletService.accountsChanged$
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
    this._sub.add(
      this._transactionService.transactionsChanged$
        .subscribe((transactions) => {
          this.hasFailedTx = transactions.some((tx) => {
            return tx.status === TransactionStatus.Fail && !tx.viewed;
          });

          this.hasPendingTx = transactions.some((tx) => {
            return tx.status === TransactionStatus.Pending;
          });

          this._cdr.markForCheck();
        }),
    );

    this.balance$ = this._walletService.balanceChanged$
      .pipe(
        map((balance) => normalizeBalance(balance))
      );

    this.wrongNetwork$ = this._walletService.networkChanged$
      .pipe(
        filter((networkId) => Number.isSafeInteger(networkId)),
        map(() => {
          const { chainId } = (window as any).ethereum as Ethereum;

          return !Boolean((this.networkOptions || []).find(n => n.chainId === chainId));
        }),
      );
  }

  public ngOnDestroy(): void {
    if (typeof this._sub.unsubscribe === 'function') {
      this._sub.unsubscribe();
    }
  }

  public async onNetworkChange(option: NetworkOption): Promise<void> {
    try {
      await this._walletService.switchEthereumChain(option.chainId);

      this.networkOptions = this.networkOptions.map(network => {
        return { ...network, isActive: option.chainId === network.chainId };
      });
    } catch (error) {
    }
  }

  public async onConnectWalletClick(): Promise<void> {
    if (this.disabled) {
      return;
    }

    const isConnected = await this._walletService.connectWallet();

    this.connectWalletEmitter.emit(isConnected);
  }

  public onChangeWalletClick(): void {
    this._walletService.connectWallet();
  }

  public onDisconnectWalletClick(): void {
    this._walletService.disconnectWallet();
  }

  public onAccountOptionClick(option: AccountOption): void {
    this.accountOptionEmitter.emit(option);
  }

  public onAccountClick(): void {
    const modal = this._matDialog.open(AccountModalComponent, {
      data: {
        header: 'Account',
        change: () => {
          modal.close();

          this.onChangeWalletClick();
        },
        disconnect: () => {
          this.onDisconnectWalletClick();

          modal.close();
        },
      },
      panelClass: 'custom-mat-dialog',
    });

    modal.beforeClosed().subscribe(() => {
      this._transactionService.markAsViewed();
    });
  }
}
