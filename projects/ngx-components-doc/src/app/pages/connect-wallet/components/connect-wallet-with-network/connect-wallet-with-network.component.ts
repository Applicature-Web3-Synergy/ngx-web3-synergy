/** Don't forget import { AucConnectWalletModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AUC_CONNECT_WALLET_APPEARANCE, AucConnectionState } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-connect-wallet-with-network',
  templateUrl: './connect-wallet-with-network.component.html',
  styleUrls: [ './connect-wallet-with-network.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectWalletWithNetworkComponent {
  public WALLET_APPEARANCE = AUC_CONNECT_WALLET_APPEARANCE;

  connected(evt: AucConnectionState): void {
    console.log('Connected Wallet: ', evt);
  }

  disconnected(): void {
    console.log('Disconnected Wallet');
  }
}
