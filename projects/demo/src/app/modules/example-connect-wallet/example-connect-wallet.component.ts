import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs';

import {
  AUC_POSITIONS,
  AucAccountOption, AucConnectionState,
  AucDropdownConfig,
  AucWalletConnectService,
  AucWalletLabel, BaseSubscriber
} from '@applicature/components';


@Component({
  selector: 'app-example-connect-wallet',
  templateUrl: './example-connect-wallet.component.html',
  styleUrls: ['./example-connect-wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleConnectWalletComponent extends BaseSubscriber {
  public networkDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: true
    },
    position: {
      vertical: AUC_POSITIONS.BELOW,
      horizontal: AUC_POSITIONS.AFTER
    }
  }

  public accountOptions: AucAccountOption[] = [
    { name: 'Some menu Item', id: '2' },
    { name: 'Some other Item', id: '3' }
  ];

  public connectedLabel: AucWalletLabel;
  public isConnected: boolean;

  constructor(private walletConnectService: AucWalletConnectService,
              private cdr: ChangeDetectorRef) {
    super();

    this.walletConnectService.connectionState$
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: AucConnectionState) => {
        this.isConnected = connectionState.connected;

        if (!connectionState.connected) {
          this.connectedLabel = null;
        } else {
          this.connectedLabel = (connectionState?.state?.wallets[0]?.label as AucWalletLabel) ?? null;
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
      .subscribe((connectionState: AucConnectionState) => {
        console.log('Custom Btn connect connectionState: ', connectionState);
      })
  }

  public customBtnDisconnect(): void {
    this.walletConnectService.disconnectWallet()
      .pipe(takeUntil(this.notifier))
      .subscribe();
  }

  public customConnect(walletLabel: AucWalletLabel): void {
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
      .subscribe((connectionState: AucConnectionState) => {
        console.log('Custom connect connectionState: ', connectionState);
      });
  }

}
