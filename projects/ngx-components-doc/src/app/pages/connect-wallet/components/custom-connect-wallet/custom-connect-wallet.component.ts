/** Notes: You can use AucWalletConnectService for custom connection visualization */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import {
  AucConnectionState,
  AucWalletConnectService,
  AucWalletLabel,
  BaseSubscriber
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-custom-connect-wallet',
  templateUrl: './custom-connect-wallet.component.html',
  styleUrls: [ './custom-connect-wallet.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomConnectWalletComponent extends BaseSubscriber implements OnInit {
  public connectionState: AucConnectionState; // Current wallet connection state.
  public connectedWalletLabel: AucWalletLabel;

  constructor(private cdr: ChangeDetectorRef, private walletConnectService: AucWalletConnectService) {
    super();
  }

  ngOnInit() {
    /** Emits when connection was changed. */
    this.walletConnectService.connectionState$
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: AucConnectionState) => {
        if (!connectionState.connected) {
          this.connectedWalletLabel = null;
        } else {
          this.connectedWalletLabel = (connectionState?.state?.wallets[0]?.label as AucWalletLabel) ?? null;
        }

        console.log('Current connectionState: ', connectionState);

        this.cdr.markForCheck();
      });
  }

  connect(walletLabel: AucWalletLabel): void {
    if (!walletLabel) {
      return;
    }

    if (walletLabel === this.connectedWalletLabel) {
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
