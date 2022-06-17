import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {
  AUC_ALERT_POSITION,
  AUC_BUTTON_APPEARANCE,
  AUC_CONNECT_WALLET_APPEARANCE,
  AUC_IDENTICON_POSITION,
  AUC_POSITIONS,
  AucAccountOption,
  AucConnectionState,
  AucDropdownConfig,
  aucGenerateJazzicon,
  AucTransactionService,
  AucWalletConnectService
} from '@applicature/components';
import { AS_COLOR_GROUP } from '@applicature/styles';
import { ProviderLabel } from '@web3-onboard/injected-wallets';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public identicon!: HTMLDivElement;
  public COLORS = AS_COLOR_GROUP;
  public BTN_APPEARANCE = AUC_BUTTON_APPEARANCE;
  public IDENTICON_POSITION = AUC_IDENTICON_POSITION;
  public ALERT_POSITION = AUC_ALERT_POSITION;
  public CONNECT_WALLET_APPEARANCE = AUC_CONNECT_WALLET_APPEARANCE;

  networkDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.AFTER
    }
  }

  accountDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.BEFORE
    }
  }

  public accountOptions: AucAccountOption[] = [
    { name: 'My Account', id: '1' },
    { name: 'Some menu Item', id: '2' },
    { name: 'Some menu Item', id: '3' }
  ];

  constructor(
    private _transactionService: AucTransactionService,
    private _walletConnectService: AucWalletConnectService,
    private _cdr: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.identicon = aucGenerateJazzicon('0x6FF69D870c84a9D7F6c12095313F18F883A77f1D');

    this._walletConnectService.accountsChanged$
      .subscribe((data) => {
        console.log('metamaskAccountsChanged$: ', data);
      });

    this._walletConnectService.chainChanged$
      .subscribe((data) => {
        console.log('ChainChanged$: ', data);
      });
  }

  public onDisconnect(evt): void {
    console.log('onDisconnect: ', evt);
  }

  public onConnect(evt): void {
    console.log('onConnect: ', evt);
  }

  public customBtnConnect(): void {
    this._walletConnectService.connect()
      .subscribe((connectionstate: AucConnectionState) => {
        console.log('Custom connect connectionState: ', connectionstate);
      })
  }

  public customConnect(): void {
    this._walletConnectService.connect()
      .subscribe((connectionstate) => {
        console.log('Custom connect connectionState 999: ', connectionstate);
      })
  }
}
