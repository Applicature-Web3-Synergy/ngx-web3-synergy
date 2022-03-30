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
import { Subscription } from 'rxjs';

import { AS_COLOR_GROUP } from '@applicature/styles';

import { AucAccountData, AucAccountOption } from '../account-button';
import { AUC_POSITIONS, AUC_TRANSACTION_STATUS } from '../enums';
import { AUC_VALUE_TYPES, aucCheckValueType, aucGenerateJazzicon } from '../helpers';
import { AucAccountModalComponent, AucAccountModalData } from '../modals';
import { AucConnectionState, AucTransactionService, AucWalletConnectService } from '../services';
import { AucDialogService } from '../dialog';
import { AucDropdownConfig } from '../dropdown-menu';
import { AUC_BALANCE_APPEARANCE } from '../account-balance';
import { ConnectWalletAppearance } from './types';
import { AUC_CONNECT_WALLET_APPEARANCE } from './enums';


@Component({
  selector: 'auc-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: [ './connect-wallet.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AucConnectWalletComponent implements OnInit, OnDestroy {
  /**
   * {@link appearance} - It's an `@Input()` parameter. <br>
   * Allows to control appearance components. Default is the button.
   * It's an optional parameter. The default value is {@link AUC_CONNECT_WALLET_APPEARANCE.BUTTON}. <br>
   * You can use enum {@link AUC_CONNECT_WALLET_APPEARANCE}.
   */
  @Input()
  public appearance: ConnectWalletAppearance = AUC_CONNECT_WALLET_APPEARANCE.BUTTON;

  /**
   * {@link disabled} - It's an `@Input()` parameter. <br>
   * Whether the button is disabled. <br>
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public disabled: boolean = false;

  /**
   * {@link showBalance} - It's an `@Input()` parameter. <br>
   * Show/hide account balance. <br>
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public showBalance: boolean = false;

  /**
   * {@link showTransactions} - It's an `@Input()` parameter. <br>
   * Show/hide Recent transactions button <br>
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public showTransactions: boolean = false;

  /**
   * {@link showNetworkOptions} - It's an `@Input()` parameter. <br>
   * Show/hide network options <br>
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public showNetworkOptions: boolean = false;

  /**
   * {@link account} - It's an `@Input()` parameter. <br>
   * User account related information. Needs for {@link AucAccountButtonComponent}. <br>
   * This is required parameter when appearance equals to {@link AUC_CONNECT_WALLET_APPEARANCE.ICON}
   */
  @Input()
  public account: AucAccountData;

  /**
   * {@link accountOptions} - It's an `@Input()` parameter. <br>
   * List of options in popover. Needs for {@link AucAccountButtonComponent}. <br>
   * This is an optional parameter, uses only with appearance {@link AUC_CONNECT_WALLET_APPEARANCE.ICON}
   */
  @Input()
  public accountOptions?: AucAccountOption[];

  /**
   * {@link accountDropdownConfig} - It's an `@Input()` parameter. <br>
   * You can customize dropdown position and overlay. <br>
   * This is an optional parameter. <br>
   * The default value is: <br>
   * {
   *   overlay: {
   *     transparent: true
   *   },
   *   position: {
   *     vertical: AUC_POSITIONS.BELOW,
   *     horizontal: AUC_POSITIONS.BEFORE
   *   }
   * }
   */
  @Input() accountDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.BEFORE
    }
  }

  /**
   * {@link networkDropdownConfig} - It's an `@Input()` parameter. <br>
   * You can customize dropdown position and overlay. <br>
   * This is an optional parameter. <br>
   * The default value is: <br>
   * {
   *   overlay: {
   *     transparent: true
   *   },
   *   position: {
   *     vertical: AUC_POSITIONS.BELOW,
   *     horizontal: AUC_POSITIONS.AFTER
   *   }
   * }
   */
  @Input() networkDropdownConfig?: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.AFTER
    }
  }

  /**
   * {@link onConnect} - It's an `@Output()` parameter. <br>
   * Emits an action when wallet was connected.
   */
  @Output()
  public onConnect: EventEmitter<AucConnectionState> = new EventEmitter<AucConnectionState>();

  /**
   * {@link onDisconnect} - It's an `@Output()` parameter. <br>
   * Emits an action when wallet was disconnected.
   */
  @Output()
  public onDisconnect: EventEmitter<void> = new EventEmitter<void>();

  public accountAddress: string;
  public identicon: HTMLDivElement;
  public isConnected: boolean = false;
  public hasFailedTx: boolean = false;
  public hasPendingTx: boolean = false;
  public txCount: number = 0;
  public COLORS = AS_COLOR_GROUP;
  public BALANCE_APPEARANCE = AUC_BALANCE_APPEARANCE;
  public CONNECT_WALLET_APPEARANCE = AUC_CONNECT_WALLET_APPEARANCE;

  private _sub: Subscription = new Subscription();

  constructor(
    private _dialogService: AucDialogService,
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    private _transactionService: AucTransactionService,
    private _walletConnectService: AucWalletConnectService,
  ) {
    this._sub.add(
      this._walletConnectService.accountsChanged$
        .subscribe((accounts) => {
          this.accountAddress = accounts?.length && accounts[0];
          this.isConnected = Boolean(this.accountAddress);

          if (this.isConnected) {
            this.identicon = aucGenerateJazzicon(this.accountAddress);
          }

          this._cdr.markForCheck();
        }),
    );
  }

  public ngOnInit(): void {
    this._sub.add(
      this._transactionService.transactionsChanged$
        .subscribe((transactions) => {
          this.txCount = transactions.filter((tx) => {
            return tx.status === AUC_TRANSACTION_STATUS.FAIL && !tx.viewed;
          }).length;

          this.hasFailedTx = this.txCount > 0;

          if (!this.hasFailedTx) {
            this.txCount = transactions.filter((tx) => {
              return tx.status === AUC_TRANSACTION_STATUS.PENDING;
            }).length;

            this.hasPendingTx = this.txCount > 0;
          }

          this._cdr.markForCheck();
        }),
    );
  }

  public ngOnDestroy(): void {
    if (aucCheckValueType(this._sub.unsubscribe, AUC_VALUE_TYPES.FUNCTION)) {
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
      width: '420px',
      maxWidth: '420px',
      overlay: {
        closeByClick: true
      }
    });
  }

  public onConnectWalletClick(isDisconnect: boolean = false): void {
    if (this.disabled) {
      return;
    }

    this._walletConnectService.connectWallet(isDisconnect)
      .subscribe((connectionState: AucConnectionState) => {
        this.onConnect.emit(connectionState);
      })
  }

  public onDisconnectWalletClick(): void {
    if (this.disabled) {
      return;
    }

    this._walletConnectService.disconnectWallet()
      .subscribe(() => {
        this.onDisconnect.emit();
      });
  }

}
