import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AS_COLOR_GROUP } from '@applicature/styles';

import { AucAccountData, AucAccountOption } from '../account-button';
import { AUC_POSITIONS } from '../enums';
import { aucGenerateJazzicon, BaseSubscriber } from '../helpers';
import { AucAccountModalComponent, AucAccountModalData } from '../modals';
import { AucConnectionState, AucWalletConnectService } from '../connect/services';
import { AucDialogService } from '../dialog';
import { AucDropdownConfig } from '../dropdown-menu';
import { AUC_BALANCE_APPEARANCE } from '../account-balance';
import { ConnectWalletAppearance } from './types';
import { AUC_CONNECT_WALLET_APPEARANCE } from './enums';
import { AUC_TRANSACTION_STATUS, AucTransactionService } from '../transactions';


@Component({
  selector: 'auc-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: [ './connect-wallet.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AucConnectWalletComponent extends BaseSubscriber implements OnInit {
  /**
   * Allows to control appearance components. Default is the button. <br>
   * You can use enum {@link AUC_CONNECT_WALLET_APPEARANCE}. <br>
   * It's an optional parameter. <br>
   * The default value is {@link AUC_CONNECT_WALLET_APPEARANCE.BUTTON}.
   */
  @Input()
  public appearance?: ConnectWalletAppearance = AUC_CONNECT_WALLET_APPEARANCE.BUTTON;

  /**
   * Whether the button is disabled. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public disabled?: boolean = false;

  /**
   * Show/hide account balance. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public showBalance?: boolean = false;

  /**
   * Show/hide Recent transactions button <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public showTransactions?: boolean = false;

  /**
   * Show/hide network options <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public showNetworkOptions?: boolean = false;

  /**
   * User account related information. <br>
   * Needs for {@link AucAccountButtonComponent}. <br>
   * It's an optional parameter, required when appearance equals to {@link AUC_CONNECT_WALLET_APPEARANCE.ICON}
   */
  @Input()
  public account: AucAccountData;

  /**
   * List of options in popover. <br>
   * Needs for {@link AucAccountButtonComponent}. <br>
   * It's an optional parameter, uses only when appearance equals to {@link AUC_CONNECT_WALLET_APPEARANCE.ICON}
   */
  @Input()
  public accountOptions?: AucAccountOption[];

  /**
   * Customize account dropdown <br>
   * It's an optional parameter. <br>
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
  @Input()
  public accountDropdownConfig?: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.BEFORE
    }
  }

  /**
   * Customize networks dropdown <br>
   * It's an optional parameter. <br>
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
  @Input()
  public networkDropdownConfig?: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.AFTER
    }
  }

  /** Emits an action when wallet was connected. */
  @Output()
  public onConnect: EventEmitter<AucConnectionState> = new EventEmitter<AucConnectionState>();

  /** Emits an action when wallet was disconnected. */
  @Output()
  public onDisconnect: EventEmitter<void> = new EventEmitter<void>();

  /** Emits selected option from the list. */
  @Output()
  public optionClicked: EventEmitter<AucAccountOption> = new EventEmitter<AucAccountOption>();

  /** @internal */
  public accountAddress: string;

  /** @internal */
  public identicon: HTMLDivElement;

  /** @internal */
  public isConnected: boolean = false;

  /** @internal */
  public hasFailedTx: boolean = false;

  /** @internal */
  public hasPendingTx: boolean = false;

  /** @internal */
  public txCount: number = 0;

  /** @internal */
  public COLORS = AS_COLOR_GROUP;

  /** @internal */
  public BALANCE_APPEARANCE = AUC_BALANCE_APPEARANCE;

  /** @internal */
  public CONNECT_WALLET_APPEARANCE = AUC_CONNECT_WALLET_APPEARANCE;

  constructor(
    private _dialogService: AucDialogService,
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    private _transactionService: AucTransactionService,
    private _walletConnectService: AucWalletConnectService,
  ) {
    super();

      this._walletConnectService.accountsChanged$
        .pipe(takeUntil(this.notifier))
        .subscribe((accounts) => {
          this.accountAddress = accounts?.length && accounts[0];
          this.isConnected = Boolean(this.accountAddress);

          if (this.isConnected) {
            this.identicon = aucGenerateJazzicon(this.accountAddress);
          }

          this._cdr.markForCheck();
        })
  }

  /** @internal */
  public ngOnInit(): void {
      this._transactionService.transactionsChanged$
        .pipe(takeUntil(this.notifier))
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
        });
  }

  /** Shows  account modal. */
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

  /** Connect wallet and emit {@link onConnect} event. */
  public onConnectWalletClick(isDisconnect: boolean = false): void {
    if (this.disabled) {
      return;
    }

    this._walletConnectService.connectWallet(isDisconnect)
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: AucConnectionState) => {
        this.onConnect.emit(connectionState);
      })
  }

  /** Disconnect wallet and emit {@link onDisconnect} event. */
  public onDisconnectWalletClick(): void {
    if (this.disabled) {
      return;
    }

    this._walletConnectService.disconnectWallet()
      .pipe(takeUntil(this.notifier))
      .subscribe(() => {
        this.onDisconnect.emit();
      });
  }

  /** Emit {@link optionClicked} event. */
  public optionAction(evt: AucAccountOption): void {
    this.optionClicked.emit(evt);
  }

}
