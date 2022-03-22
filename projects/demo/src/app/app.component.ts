import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import {
  AucAccountOption,
  generateJazzicon,
  AucNetworkOption,
  WalletConnectService,
  AUC_POSITIONS,
  AucDropdownConfig,
  AUC_BUTTON_APPEARANCE,
  AUC_IDENTICON_POSITION,
  ConnectionState,
  AUC_CHAIN_ID,
  aucGetChainParams,
  AUC_ALERT_POSITION
} from '@applicature/components';
import { AS_COLOR_GROUP } from '@applicature/styles';


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
  public networkOptions: AucNetworkOption[] = [
    {
      icon: 'assets/svg/network/eth.svg',
      name: 'Ethereum',
      chainId: AUC_CHAIN_ID.RINKEBY_TESTNET,
      isActive: false
    },
    {
      icon: 'assets/svg/network/eth.svg',
      name: 'Kovan',
      chainId: AUC_CHAIN_ID.KOVAN_TESTNET,
      isActive: false
    },
    {
      icon: 'assets/svg/network/bsc.svg',
      name: 'BSC',
      chainId: AUC_CHAIN_ID.BSC_TESTNET,
      isActive: false
    },
    {
      icon: 'assets/svg/network/polygon.svg',
      name: 'Polygon',
      chainId: AUC_CHAIN_ID.POLYGON_TESTNET,
      isActive: false
    },
    {
      icon: 'assets/svg/network/avax.svg',
      name: 'Avalanche',
      chainId: AUC_CHAIN_ID.AVALANCH_TESTNET,
      isActive: false,
      chainParams: {
        ...(aucGetChainParams(AUC_CHAIN_ID.AVALANCH_TESTNET)),
        chainName: 'Avalanche TestNet'
      }
    },
  ];

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
    { name: 'My Account', id: 1 },
    { name: 'Some menu Item', id: 2 },
    { name: 'Some menu Item', id: 3 }
  ];

  constructor(
    private _walletConnectService: WalletConnectService,
    private _cdr: ChangeDetectorRef
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

  public onDisconnect(evt): void {
    console.log('onDisconnect: ', evt);
  }

  public onConnect(evt): void {
    console.log('onConnect: ', evt);
  }

  public customBtnConnect(): void {
    this._walletConnectService.connectWallet()
      .subscribe((connectionstate: ConnectionState) => {
        console.log('Custom connect connectionState: ', connectionstate);
      })
  }
}
