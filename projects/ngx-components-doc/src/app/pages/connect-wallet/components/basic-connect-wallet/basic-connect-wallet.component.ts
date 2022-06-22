/** Don't forget import { AucConnectWalletModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AucConnectionState } from '@applicature/components';


@Component({
  selector: 'doc-basic-connect-wallet',
  templateUrl: './basic-connect-wallet.component.html',
  styleUrls: [ './basic-connect-wallet.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicConnectWalletComponent {
  connected(evt: AucConnectionState): void {
    console.log('Connected Wallet: ', evt);
  }

  disconnected(): void {
    console.log('Disconnected Wallet');
  }
}
