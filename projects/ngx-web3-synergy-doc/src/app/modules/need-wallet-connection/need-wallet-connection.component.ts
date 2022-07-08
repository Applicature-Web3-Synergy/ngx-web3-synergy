import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { W3sWalletConnectService, BaseSubscriber } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-need-wallet-connection',
  templateUrl: './need-wallet-connection.component.html',
  styleUrls: [ './need-wallet-connection.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeedWalletConnectionComponent extends BaseSubscriber implements OnInit {
  get isConnected(): boolean {
    return this.walletConnectService.connectionState.connected;
  }

  constructor(private cdr: ChangeDetectorRef, private walletConnectService: W3sWalletConnectService) {
    super();
  }

  ngOnInit() {
    this.walletConnectService.accounts$
      .pipe(takeUntil(this.notifier))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }
}
