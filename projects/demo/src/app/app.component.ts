import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { takeUntil } from 'rxjs';

import {
  W3sConnectionState,
  W3sTransactionService,
  W3sWalletConnectService,
  BaseSubscriber
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseSubscriber {
  isConnected: boolean;

  constructor(
    private _transactionService: W3sTransactionService,
    private _walletConnectService: W3sWalletConnectService,
    private _cdr: ChangeDetectorRef
  ) {
    super();

    this._walletConnectService.connectionState$
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: W3sConnectionState) => {
        this.isConnected = connectionState.connected;
      });
  }
}
