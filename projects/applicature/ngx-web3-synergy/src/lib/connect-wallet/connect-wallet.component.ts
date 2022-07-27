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

import { W3sAccountData, W3sAccountOption } from '../account-button';
import { W3S_POSITIONS } from '../enums';
import { w3sGenerateJazzicon, BaseSubscriber } from '../helpers';
import { W3sAccountModalComponent, W3sAccountModalData } from '../modals';
import { W3sConnectionState, W3sWalletConnectService } from '../connect';
import { W3sDialogService } from '../dialog';
import { W3sDropdownConfig } from '../dropdown-menu';
import { W3S_BALANCE_APPEARANCE } from '../account-balance';
import { W3sConnectWalletAppearance } from './types';
import { W3S_CONNECT_WALLET_APPEARANCE } from './enums';
import { W3S_TRANSACTION_STATUS, W3sTransactionService } from '../transactions';


@Component({
  selector: 'w3s-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: [ './connect-wallet.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class W3sConnectWalletComponent extends BaseSubscriber implements OnInit {
  /**
   * Allows to control appearance components. Default is the button. <br>
   * You can use enum {@link W3S_CONNECT_WALLET_APPEARANCE}. <br>
   * It's an optional parameter. <br>
   * The default value is {@link W3S_CONNECT_WALLET_APPEARANCE.BUTTON}.
   */
  @Input()
  public appearance?: W3sConnectWalletAppearance = W3S_CONNECT_WALLET_APPEARANCE.BUTTON;

  /**
   * Whether the button is disabled. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public disabled?: boolean = false;

  /**
   * Show/hide wallet icon. <br>
   * It's an optional parameter. <br>
   * The default value is true.
   */
  @Input()
  public showWalletIcon?: boolean = true;

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
   * Needs for {@link W3sAccountButtonComponent}. <br>
   * It's an optional parameter, required when appearance equals to {@link W3S_CONNECT_WALLET_APPEARANCE.ICON}
   */
  @Input()
  public account: W3sAccountData;

  /**
   * List of options in popover. <br>
   * Needs for {@link W3sAccountButtonComponent}. <br>
   * It's an optional parameter, uses only when appearance equals to {@link W3S_CONNECT_WALLET_APPEARANCE.ICON}
   */
  @Input()
  public accountOptions?: W3sAccountOption[];

  /**
   * Customize account dropdown <br>
   * It's an optional parameter. <br>
   * The default value is: <br>
   * {
   *   overlay: {
   *     transparent: true
   *   },
   *   position: {
   *     vertical: W3S_POSITIONS.BELOW,
   *     horizontal: W3S_POSITIONS.BEFORE
   *   }
   * }
   */
  @Input()
  public accountDropdownConfig?: W3sDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: W3S_POSITIONS.BELOW,
      horizontal: W3S_POSITIONS.BEFORE
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
   *     vertical: W3S_POSITIONS.BELOW,
   *     horizontal: W3S_POSITIONS.AFTER
   *   }
   * }
   */
  @Input()
  public networkDropdownConfig?: W3sDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: W3S_POSITIONS.BELOW,
      horizontal: W3S_POSITIONS.AFTER
    }
  }

  /** Emits an action when wallet was connected. */
  @Output()
  public connected: EventEmitter<W3sConnectionState> = new EventEmitter<W3sConnectionState>();

  /** Emits an action when wallet was disconnected. */
  @Output()
  public disconnected: EventEmitter<void> = new EventEmitter<void>();

  /** Emits selected option from the list. */
  @Output()
  public optionClicked: EventEmitter<W3sAccountOption> = new EventEmitter<W3sAccountOption>();

  /** @internal */
  public accountAddress: string;

  /** @internal */
  public identicon: HTMLDivElement;

  /** @internal */
  public isConnected = false;

  /** @internal */
  public hasFailedTx = false;

  /** @internal */
  public hasPendingTx = false;

  /** @internal */
  public txCount = 0;

  /** @internal */
  public COLORS = AS_COLOR_GROUP;

  /** @internal */
  public BALANCE_APPEARANCE = W3S_BALANCE_APPEARANCE;

  /** @internal */
  public CONNECT_WALLET_APPEARANCE = W3S_CONNECT_WALLET_APPEARANCE;

  constructor(
    private _dialogService: W3sDialogService,
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    private _transactionService: W3sTransactionService,
    private _walletConnectService: W3sWalletConnectService,
  ) {
    super();

      this._walletConnectService.accounts$
        .pipe(takeUntil(this.notifier))
        .subscribe((accounts) => {
          this.accountAddress = accounts?.length && accounts[0];
          this.isConnected = Boolean(this.accountAddress);

          if (this.isConnected) {
            this.identicon = w3sGenerateJazzicon(this.accountAddress);
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
            return tx.status === W3S_TRANSACTION_STATUS.FAIL && !tx.viewed;
          }).length;

          this.hasFailedTx = this.txCount > 0;

          if (!this.hasFailedTx) {
            this.txCount = transactions.filter((tx) => {
              return tx.status === W3S_TRANSACTION_STATUS.PENDING;
            }).length;

            this.hasPendingTx = this.txCount > 0;
          }

          this._cdr.markForCheck();
        });
  }

  /** Shows  account modal. */
  public accountButtonClick(): void {
    if (this.disabled) {
      return;
    }

    const data: W3sAccountModalData = {
      header: 'Account',
      change: () => {
        modal.close();

        this.connect();
      },
      disconnect: () => {
        this.disconnectWalletClick();

        modal.close();
      },
    };

    const modal = this._dialogService.open<W3sAccountModalComponent, W3sAccountModalData>(W3sAccountModalComponent, {
      data,
      dialogClass: 'w3s-account-dialog',
      width: '420px',
      maxWidth: '420px',
      overlay: {
        closeByClick: true
      }
    });
  }

  /** Connect wallet and emit {@link connected} event. */
  public connect(): void {
    if (this.disabled) {
      return;
    }

    this._walletConnectService.connect()
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: W3sConnectionState) => {
        this.connected.emit(connectionState);
      })
  }

  /** Disconnect wallet and emit {@link disconnected} event. */
  public disconnectWalletClick(): void {
    if (this.disabled) {
      return;
    }

    this._walletConnectService.disconnectWallet()
      .pipe(takeUntil(this.notifier))
      .subscribe(() => {
        this.disconnected.emit();
      });
  }

  /** Emit {@link optionClicked} event. */
  public optionAction(evt: W3sAccountOption): void {
    this.optionClicked.emit(evt);
  }

}
