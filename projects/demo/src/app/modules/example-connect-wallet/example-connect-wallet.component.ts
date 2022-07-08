import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs';

import {
  W3S_POSITIONS,
  W3sAccountOption, W3sConnectionState,
  W3sDropdownConfig,
  W3sWalletConnectService,
  W3sWalletLabel, BaseSubscriber
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'app-example-connect-wallet',
  templateUrl: './example-connect-wallet.component.html',
  styleUrls: ['./example-connect-wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleConnectWalletComponent extends BaseSubscriber {
  public networkDropdownConfig: W3sDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: W3S_POSITIONS.BELOW,
      horizontal: W3S_POSITIONS.AFTER
    }
  }

  public accountOptions: W3sAccountOption[] = [
    { name: 'Some menu Item', id: '2' },
    { name: 'Some other Item', id: '3' }
  ];

  public connectedLabel: W3sWalletLabel;
  public isConnected: boolean;

  constructor(private walletConnectService: W3sWalletConnectService,
              private cdr: ChangeDetectorRef) {
    super();

    this.walletConnectService.connectionState$
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: W3sConnectionState) => {
        this.isConnected = connectionState.connected;

        if (!connectionState.connected) {
          this.connectedLabel = null;
        } else {
          this.connectedLabel = (connectionState?.state?.wallets[0]?.label as W3sWalletLabel) ?? null;
        }

        this.cdr.markForCheck();
      });
  }

  public disconnected(evt): void {
    console.log('disconnected: ', evt);
  }

  public connected(evt): void {
    console.log('connected: ', evt);
  }

  public customBtnConnect(): void {
    this.walletConnectService.connect()
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: W3sConnectionState) => {
        console.log('Custom Btn connect connectionState: ', connectionState);
      })
  }

  public customBtnDisconnect(): void {
    this.walletConnectService.disconnectWallet()
      .pipe(takeUntil(this.notifier))
      .subscribe();
  }

  public customConnect(walletLabel: W3sWalletLabel): void {
    if (!walletLabel) {
      return;
    }

    if (walletLabel === this.connectedLabel) {
      this.walletConnectService.disconnectWallet(walletLabel)
        .pipe(takeUntil(this.notifier))
        .subscribe();

      return;
    }

    this.walletConnectService.connectWallet(walletLabel)
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: W3sConnectionState) => {
        console.log('Custom connect connectionState: ', connectionState);
      });
  }

}
