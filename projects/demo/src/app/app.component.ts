import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { takeUntil } from 'rxjs';

import { AucConnectionState, AucTransactionService, AucWalletConnectService } from '@applicature/components';

import { BaseSubscriber } from '@applicature/components';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseSubscriber {
  isConnected: boolean;

  constructor(
    private _transactionService: AucTransactionService,
    private _walletConnectService: AucWalletConnectService,
    private _cdr: ChangeDetectorRef
  ) {
    super();

    this._walletConnectService.connectionState$
      .pipe(takeUntil(this.notifier))
      .subscribe((connectionState: AucConnectionState) => {
        this.isConnected = connectionState.connected;
      });
  }
}
