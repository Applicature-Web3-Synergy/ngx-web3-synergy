/** Don't forget import { W3sConnectWalletModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { W3sConnectionState } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-connect-wallet',
  templateUrl: './basic-connect-wallet.component.html',
  styleUrls: [ './basic-connect-wallet.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicConnectWalletComponent {
  connected(evt: W3sConnectionState): void {
    console.log('Connected Wallet: ', evt);
  }

  disconnected(): void {
    console.log('Disconnected Wallet');
  }
}
