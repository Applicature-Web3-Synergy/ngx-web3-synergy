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
import { map, takeUntil } from 'rxjs/operators';

import { Balances } from '@web3-onboard/core/dist/types';
import { Chain } from '@web3-onboard/common/dist/types';
import BigNumber from 'bignumber.js';
import { AS_COLOR_GROUP, AsColorGroup, AsColorProperties, AsColors } from '@applicature/styles';

import { aucGenerateJazzicon, aucToBN, BaseSubscriber } from '../helpers';
import { AucWalletConnectService } from '../connect/services';
import { AucBalanceAppearance } from './types';
import { AUC_BALANCE_APPEARANCE } from './enums';
import { AucSetStyleProp } from '../directives';
import { AucAccountBalanceAddressConfig } from './interfaces';


@Component({
  selector: 'auc-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: [ './account-balance.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucAccountBalanceComponent extends BaseSubscriber implements OnInit, OnChanges {
  /**
   * Sets style for appearance. <br>
   * You can use one of the values from enum {@link AUC_BALANCE_APPEARANCE}.<br>
   * It's an optional parameter.
   */
  @Input()
  public appearance?: AucBalanceAppearance;

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
  public addressConfig?: AucAccountBalanceAddressConfig;

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
  public accountClicked: EventEmitter<any> = new EventEmitter<any>();

  /** @internal */
  @ViewChild('addressRef', { static: true })
  private _addressRef!: ElementRef<HTMLDivElement>;

  /** Current connected wallet address. */
  public address: string;

  /** Current connected wallet balance. */
  public balance: string | null = null;

  /** Current network */
  public activeNetwork: Chain;

  /** @internal */
  private chainsList: Chain[] = [];

  /** @internal */
  public styleProperties: AucSetStyleProp[] = [];

  /** @internal */
  public COLOR_GROUP = AS_COLOR_GROUP;

  /** @internal */
  public get classNames(): { [el: string]: boolean } {
    return {
      ['auc-balance']: true,
      [`auc-balance-${this.appearance}`]: true,
      ['auc-balance-with-address']: this.showAddress,
    };
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    private _walletConnectService: AucWalletConnectService,
  ) {
    super();

    const connectionState = this._walletConnectService.connectionState;

    if (!connectionState.connected) {
      this.chainsList = [];

      return;
    }

    this.chainsList = connectionState.state.chains;
  }

  /** @internal */
  public ngOnInit(): void {
    this._walletConnectService.chain$
      .pipe(takeUntil(this.notifier))
      .subscribe((chainId: string) => {
        this.activeNetwork = this.chainsList.find((chain: Chain) => chain.id === chainId) || null;
        this._cdr.markForCheck();
      });

    this._walletConnectService.balance$
      .pipe(
        map((balance: Balances | null) => {
          if (!balance) {
            return null;
          }

          const balanceSymbol = Object.keys(balance)[0];

          if (!balanceSymbol) {
            return null;
          }

          const balanceVal: string = balance[balanceSymbol];
          const balanceBn: BigNumber = aucToBN(balanceVal);

          const fixedVal = balanceVal.startsWith('0.000')
            ? 4
            : balanceVal.startsWith('0.00') ? 3 : 2;

          return `${aucToBN(balanceBn.toFixed(fixedVal, 1)).toFixed()} ${balanceSymbol}`;
        }),
        takeUntil(this.notifier)
      ).subscribe((balance: string | null) => {
      if (this.balance !== balance) {
        this.balance = balance;
        this._cdr.detectChanges();
      }
    });

    this._walletConnectService.accounts$
      .pipe(
        map((accounts: string[]) => {
          const account = (accounts ?? [])[0] || null;

          if (account && this.showAddress && this.addressConfig?.showIdenticon) {
            this.identicon = aucGenerateJazzicon(account);
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
          name: `--auc-account-balance-${prop}`,
          value: colorProperties[prop]
        }
      });

    this._cdr.markForCheck();
  }

  /** Emit {@link accountClicked} event. */
  public accountButtonClick(evt): void {
    this.accountClicked.next(evt);
  }

}
