import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { AucWalletConnectService, BaseSubscriber } from '@applicature/components';


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

  constructor(private cdr: ChangeDetectorRef, private walletConnectService: AucWalletConnectService) {
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
