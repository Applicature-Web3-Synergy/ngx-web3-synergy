import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { AucConnectionState, AucWalletConnectService, BaseSubscriber } from '@applicature/components';


@Component({
  selector: 'doc-custom-connect-wallet',
  templateUrl: './custom-connect-wallet.component.html',
  styleUrls: [ './custom-connect-wallet.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomConnectWalletComponent extends BaseSubscriber implements OnInit {
  get isConnected(): boolean {
    return this.walletConnectService.connectionState.connected;
  }

  constructor(private cdr: ChangeDetectorRef, private walletConnectService: AucWalletConnectService) {
    super();
  }

  ngOnInit() {
    this.walletConnectService.accountsChanged$
      .pipe(takeUntil(this.notifier))
      .subscribe((res) => {
        this.cdr.markForCheck();
      });
  }

  toggleConnect(): void {
    if (this.walletConnectService.connectionState.connected) {
      this.walletConnectService.disconnectWallet()
        .pipe(takeUntil(this.notifier))
        .subscribe(() => {
          console.log('Custom disconnected Wallet')
        });

      return;
    }

    this.walletConnectService.connectWallet()
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: AucConnectionState) => {
        console.log('Custom connect connectionState: ', connectionState);
      })
  }
}
