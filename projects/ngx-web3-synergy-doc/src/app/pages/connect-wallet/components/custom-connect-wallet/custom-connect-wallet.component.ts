/** Notes: You can use W3sWalletConnectService for custom connection visualization */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import {
  W3sConnectionState,
  W3sWalletConnectService,
  W3sWalletLabel,
  BaseSubscriber
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-custom-connect-wallet',
  templateUrl: './custom-connect-wallet.component.html',
  styleUrls: [ './custom-connect-wallet.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomConnectWalletComponent extends BaseSubscriber implements OnInit {
  public connectionState: W3sConnectionState; // Current wallet connection state.
  public connectedWalletLabel: W3sWalletLabel;

  constructor(private cdr: ChangeDetectorRef, private walletConnectService: W3sWalletConnectService) {
    super();
  }

  ngOnInit() {
    /** Emits when connection was changed. */
    this.walletConnectService.connectionState$
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: W3sConnectionState) => {
        if (!connectionState.connected) {
          this.connectedWalletLabel = null;
        } else {
          this.connectedWalletLabel = (connectionState?.state?.wallets[0]?.label as W3sWalletLabel) ?? null;
        }

        console.log('Current connectionState: ', connectionState);

        this.cdr.markForCheck();
      });
  }

  connect(walletLabel: W3sWalletLabel): void {
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
      .subscribe((connectionState: W3sConnectionState) => {
        console.log('Custom connect connectionState: ', connectionState);
      });
  }

}
