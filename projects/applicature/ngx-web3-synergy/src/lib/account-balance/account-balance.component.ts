import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { Balances } from '@web3-onboard/core/dist/types';
import { Chain } from '@web3-onboard/common/dist/types';
import BigNumber from 'bignumber.js';
import { AS_COLOR_GROUP, AsColorGroup, AsColorProperties, AsColors } from '@applicature/styles';

import { BaseSubscriber, w3sGenerateJazzicon, w3sToBN } from '../helpers';
import { W3sWalletConnectService } from '../connect';
import { W3sBalanceAppearance } from './types';
import { W3sSetStyleProp } from '../directives';
import { W3sAccountBalanceAddressConfig } from './interfaces';


@Component({
  selector: 'w3s-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: [ './account-balance.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sAccountBalanceComponent extends BaseSubscriber implements OnInit, OnChanges {
  /**
   * Sets style for appearance. <br>
   * You can use one of the values from enum {@link W3S_BALANCE_APPEARANCE}.<br>
   * It's an optional parameter.
   */
  @Input()
  public appearance?: W3sBalanceAppearance;

  /**
   * Sets theme of the button. <br>
   * It's an optional parameter. <br>
   * The default value is white. <br>
   * You can use enum {@link AS_COLOR_GROUP}. <br>
   * If selected appearance transparent, color is ignored.
   */
  @Input()
  public color?: AsColorGroup = AS_COLOR_GROUP.WHITE;

  /**
   * Shows Currency icon from supported networks list. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public isCurrency?: boolean = false;

  /**
   * Show or hide account address. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public showAddress?: boolean = false;

  /**
   * Configuration for account address button <br>
   * It's an optional parameter.
   */
  @Input()
  public addressConfig?: W3sAccountBalanceAddressConfig;

  /**
   * Shows identicon if provided. <br>
   * It's an optional parameter.
   * */
  @Input()
  public identicon?: HTMLDivElement;

  /**
   * Emits an action when account button was clicked. <br>
   * Emitted value is native click value.
   */
  @Output()
  public accountClicked: EventEmitter<any> = new EventEmitter<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

  /** @internal */
  @ViewChild('addressRef', { static: true })
  private _addressRef!: ElementRef<HTMLDivElement>;

  /** Current connected wallet address. */
  public address: string;

  /** Current connected wallet balance. */
  public balance: { value: string, currency: string } = null;

  /** Current network */
  public activeNetwork: Chain;

  /** @internal */
  private chainsList: Chain[] = [];

  /** @internal */
  public styleProperties: W3sSetStyleProp[] = [];

  /** @internal */
  public COLOR_GROUP = AS_COLOR_GROUP;

  /** @internal */
  public smallBalanceWidth = false;

  /** @internal */
  public get classNames(): { [el: string]: boolean } {
    return {
      ['w3s-balance']: true,
      [`w3s-balance-${this.appearance}`]: true,
      ['w3s-balance-with-icon']: !!(this.isCurrency && this.activeNetwork?.icon),
      ['w3s-balance-with-address']: this.showAddress,
      ['w3s-balance-with-address-identicon']: this.showAddress && this.addressConfig?.showIdenticon,
    };
  }

  /** @internal */
  private _balanceContainerWidth: number;

  /** @internal */
  private _balanceValWidth: number;

  /** @internal */
  private _balanceCurrencyWidth: number;

  /** @internal */
  private _balanceWidthChanged$: Subject<void> = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: W3sWalletConnectService,
  ) {
    super();

    this._balanceWidthChanged$
      .pipe(
        debounceTime(100),
        filter(() => !!(this._balanceContainerWidth || this._balanceValWidth || this._balanceCurrencyWidth)),
        takeUntil(this.notifier)
      )
      .subscribe(() => {
        this.calculateBalanceWidth();
      });
  }

  /** @internal */
  public ngOnInit(): void {
    this.balanceSubscriptions();
  }

  private balanceSubscriptions(): void {
    this._walletConnectService.chain$
      .pipe(takeUntil(this.notifier))
      .subscribe((chainId: string) => {
        const connectionState = this._walletConnectService.connectionState;

        if ( !connectionState.connected ) {
          this.chainsList = [];

          return;
        }

        this.chainsList = connectionState.state.chains;
        this.activeNetwork = this.chainsList.find((chain: Chain) => chain.id === chainId) || null;
        this._cdr.markForCheck();
      });

    this._walletConnectService.balance$
      .pipe(
        map((balance: Balances | null) => {
          if ( !balance ) {
            return null;
          }

          const balanceSymbol = Object.keys(balance)[0];

          if ( !balanceSymbol ) {
            return null;
          }

          const balanceVal: string = balance[balanceSymbol];
          const balanceBn: BigNumber = w3sToBN(balanceVal);

          const fixedVal = balanceVal.startsWith('0.000')
            ? 4
            : balanceVal.startsWith('0.00') ? 3 : 2;

          return {
            value: w3sToBN(balanceBn.toFixed(fixedVal, 1)).toFixed(),
            currency: balanceSymbol
          };
        }),
        takeUntil(this.notifier)
      )
      .subscribe(balance => {
        if ( this.balance?.value !== balance?.value && this.balance?.currency !== balance?.currency ) {
          this.balance = balance;
          this._cdr.detectChanges();
        }
      });

    this._walletConnectService.accounts$
      .pipe(
        map((accounts: string[]) => {
          const account = (accounts ?? [])[0] || null;

          if ( account && this.showAddress && this.addressConfig?.showIdenticon ) {
            this.identicon = w3sGenerateJazzicon(account, 20);
          }

          return account;
        }),
        takeUntil(this.notifier)
      )
      .subscribe((address: string) => {
        this.address = address;
        this._cdr.markForCheck();
      });
  }

  /** @internal */
  public ngOnChanges(): void {
    const colorProperties: AsColorProperties = AsColors[this.color || AS_COLOR_GROUP.WHITE];

    this.styleProperties = Object.keys(colorProperties || {})
      .map((prop: string) => {
        return {
          name: `--w3s-account-balance-${prop}`,
          value: colorProperties[prop]
        };
      });

    this._cdr.markForCheck();
  }

  /** Emit {@link accountClicked} event. */
  public accountButtonClick(evt): void {
    this.accountClicked.emit(evt);
  }

  /** @internal */
  public balanceContainerWidthChanged(width: number): void {
    this._balanceContainerWidth = width;
    this._balanceWidthChanged$.next();
  }

  /** @internal */
  public balanceValWidthChanged(width: number): void {
    this._balanceValWidth = width;
    this._balanceWidthChanged$.next();
  }

  /** @internal */
  public balanceCurrencyWidthChanged(width: number): void {
    this._balanceCurrencyWidth = width;
    this._balanceWidthChanged$.next();
  }

  /** @internal */
  private calculateBalanceWidth(): void {
    if ( !this._balanceContainerWidth || !this._balanceValWidth || !this._balanceCurrencyWidth ) {
      return;
    }

    this.smallBalanceWidth = this._balanceContainerWidth + 1 < (this._balanceValWidth + this._balanceCurrencyWidth);

    this._cdr.detectChanges();
  }

}
