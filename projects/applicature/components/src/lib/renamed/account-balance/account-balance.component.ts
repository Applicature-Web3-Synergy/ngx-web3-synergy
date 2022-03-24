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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AS_COLOR_GROUP, AsColorGroup, AsColorProperties, AsColors } from '@applicature/styles';

import { aucGenerateJazzicon, aucNormalizeBalance } from '../helpers';
import { AucConnectionState, AucWalletConnectService } from '../../services';
import { AucBalanceAppearance } from './types';
import { AUC_BALANCE_APPEARANCE } from './enums';
import { AucNetworkOption } from '../interfaces';
import { AucSetStyleProp } from '../directives';
import { AucAccountBalanceAddressConfig } from './interfaces';


@Component({
  selector: 'auc-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: [ './account-balance.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucAccountBalanceComponent implements OnInit, OnChanges {
  /**
   * {@link appearance} - It's an `@Input()` parameter. <br>
   * Sets style for appearance.<br>
   * You can use one of the values from enum {@link AUC_BALANCE_APPEARANCE}.<br>
   * It's an optional parameter.
   */
  @Input()
  public appearance?: AucBalanceAppearance;

  /**
   * {@link color} - It's an `@Input()` parameter. <br>
   * Sets theme of the button. <br>
   * It's an optional parameter. The default value is white. <br>
   * You can use enum {@link AS_COLOR_GROUP}.
   */
  @Input()
  public color: AsColorGroup = AS_COLOR_GROUP.WHITE;

  /**
   * {@link isCurrency} - It's an `@Input()` parameter. <br>
   * Shows Currency icon from supported networks list. <br>
   * You will set supported networks when initialize library, {@link AucNetworkOption.icon}. <br>
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public isCurrency?: boolean = false;

  /**
   * {@link showAddress} - It's an `@Input()` parameter. <br>
   * Show or hide account address. <br>
   * It's an optional parameter. The default value is false. <br>
   */
  @Input()
  public showAddress: boolean = false;

  /**
   * {@link addressConfig} - It's an `@Input()` parameter. <br>
   * Configuration for account address button <br>
   * It's an optional parameter.<br>
   */
  @Input()
  public addressConfig?: AucAccountBalanceAddressConfig;

  /**
   * {@link onAddressClick} - It's an `@Output()` parameter. <br>
   * Emits an action when account button was clicked. <br>
   * Emitted value is native click value.
   */
  @Output()
  public onAddressClick: EventEmitter<any> = new EventEmitter<any>();

  public address$: Observable<string>;
  public balance$: Observable<string>;
  public activeNetwork: AucNetworkOption;
  public styleProperties: AucSetStyleProp[] = [];
  public COLOR_GROUP = AS_COLOR_GROUP;

  /**
   * {@link identicon} - Shows identicon if provided.
   */
  @Input()
  public identicon: HTMLDivElement;

  @ViewChild('addressRef', { static: true })
  private _addressRef!: ElementRef<HTMLDivElement>;

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
    this.balance$ = this._walletConnectService.balanceChanged$
      .pipe(
        map((balance: string) => {
          const connectionState: AucConnectionState = this._walletConnectService.connectionState;

          return aucNormalizeBalance(connectionState?.state?.network, balance) ?? '0'
        })
      );

    this._walletConnectService.selectedNetwork$
      .subscribe((network: AucNetworkOption) => {
        this.activeNetwork = network;

        this._cdr.markForCheck();
      });
  }

  public ngOnInit(): void {
    this.address$ = this._walletConnectService.accountsChanged$
      .pipe(
        map((accounts: string[]) => {
          const account = (accounts ?? [])[0] || null;

          if (account && this.showAddress && this.addressConfig?.showIdenticon) {
            this.identicon = aucGenerateJazzicon(account);
          }

          return account;
        }),
      );
  }

  public ngOnChanges(): void {
    if (this.appearance === AUC_BALANCE_APPEARANCE.TRANSPARENT) {
      return;
    }

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

  public onAccountButtonClick(evt): void {
    this.onAddressClick.next(evt);
  }

}
