import { Component, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs';

import { aucGenerateJazzicon, AucWalletConnectService, BaseSubscriber } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'app-example-buttons',
  templateUrl: './example-buttons.component.html',
  styleUrls: ['./example-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleButtonsComponent extends BaseSubscriber {
  public identicon: HTMLDivElement;

  constructor(private walletConnectService: AucWalletConnectService) {
    super();

    this.walletConnectService.accounts$
      .pipe(takeUntil(this.notifier))
      .subscribe((accounts: string[]) => {
        if (accounts.length) {
          this.identicon = aucGenerateJazzicon(accounts[0]);
        }
      })

  }
}
