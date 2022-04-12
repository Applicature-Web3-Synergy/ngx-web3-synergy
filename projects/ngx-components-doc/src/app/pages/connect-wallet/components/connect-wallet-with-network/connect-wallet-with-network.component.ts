/** Dont forget import { AucConnectWalletModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AUC_CONNECT_WALLET_APPEARANCE, AucConnectionState } from '@applicature/components';


@Component({
  selector: 'doc-connect-wallet-with-network',
  templateUrl: './connect-wallet-with-network.component.html',
  styleUrls: [ './connect-wallet-with-network.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectWalletWithNetworkComponent {
  public WALLET_APPEARANCE = AUC_CONNECT_WALLET_APPEARANCE;

  onConnect(evt: AucConnectionState): void {
    console.log('Connected Wallet: ', evt);
  }

  onDisconnect(): void {
    console.log('Disconnected Wallet');
  }
}
