import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import {
  AccountOption,
  generateJazzicon,
  NetworkOption,
  WalletConnectService,
  APPLICATURE_POSITIONS,
  ApplicatureDropdownConfig
} from '@applicature/components';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public identicon!: HTMLDivElement;
  public networkOptions: NetworkOption[] = [
    {
      icon: 'assets/svg/network/eth.svg',
      name: 'Ethereum',
      chainId: '0x1',
      isActive: false
    },
    {
      icon: 'assets/svg/network/eth.svg',
      name: 'Kovan',
      chainId: '0x2a',
      isActive: false
    },
    {
      icon: 'assets/svg/network/bsc.svg',
      name: 'BSC',
      chainId: '0x38',
      isActive: false
    },
    {
      icon: 'assets/svg/network/polygon.svg',
      name: 'Polygon',
      chainId: '0x89',
      isActive: false
    },
    {
      icon: 'assets/svg/network/avax.svg',
      name: 'Avalanche',
      chainId: '0xa86a',
      isActive: false
    }
  ];
  networkDropdownConfig: ApplicatureDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: APPLICATURE_POSITIONS.BELOW,
      horizontal: APPLICATURE_POSITIONS.AFTER
    }
  }

  accountDropdownConfig: ApplicatureDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: APPLICATURE_POSITIONS.BELOW,
      horizontal: APPLICATURE_POSITIONS.BEFORE
    }
  }

  public accountOptions: AccountOption[] = [
    { name: 'My Account', id: 1 },
    { name: 'Some menu Item', id: 2 },
    { name: 'Some menu Item', id: 3 }
  ];

  constructor(
    private _walletConnectService: WalletConnectService
  ) {

  }

  public ngOnInit(): void {
    this.identicon = generateJazzicon('0x6FF69D870c84a9D7F6c12095313F18F883A77f1D');

    this._walletConnectService.accountsChanged$
      .subscribe((data) => {
        console.log('metamaskAccountsChanged$: ', data);
      });

    this._walletConnectService.chainChanged$
      .subscribe((data) => {
        console.log('metamaskChainChanged$: ', data);
      });

    this._walletConnectService.connectChanged$
      .subscribe((data) => {
        console.log('metamaskConnect$: ', data);
      });

    this._walletConnectService.disconnectChanged$
      .subscribe((data) => {
        console.log('metamaskDisconnect$: ', data);
      });

    this._walletConnectService.messageChanged$
      .subscribe((data) => {
        console.log('metamaskMessage$: ', data);
      });
  }

}
