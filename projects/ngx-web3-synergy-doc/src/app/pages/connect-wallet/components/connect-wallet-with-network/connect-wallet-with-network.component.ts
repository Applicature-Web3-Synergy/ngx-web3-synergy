/** Don't forget import { W3sConnectWalletModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { W3S_CONNECT_WALLET_APPEARANCE, W3sConnectionState } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-connect-wallet-with-network',
  templateUrl: './connect-wallet-with-network.component.html',
  styleUrls: [ './connect-wallet-with-network.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectWalletWithNetworkComponent {
  public WALLET_APPEARANCE = W3S_CONNECT_WALLET_APPEARANCE;

  connected(evt: W3sConnectionState): void {
    console.log('Connected Wallet: ', evt);
  }

  disconnected(): void {
    console.log('Disconnected Wallet');
  }
}
