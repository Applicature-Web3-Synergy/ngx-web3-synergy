/** Dont forget import { AucConnectWalletModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  AUC_CONNECT_WALLET_APPEARANCE,
  AUC_POSITIONS,
  AucAccountOption,
  AucConnectionState,
  AucDropdownConfig
} from '@applicature/components';


@Component({
  selector: 'doc-connect-wallet-as-icon',
  templateUrl: './connect-wallet-as-icon.component.html',
  styleUrls: [ './connect-wallet-as-icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectWalletAsIconComponent {
  public WALLET_APPEARANCE = AUC_CONNECT_WALLET_APPEARANCE;

  public accountOptions: AucAccountOption[] = [
    { name: 'My Account', id: 1 },
    { name: 'Some menu Item', id: 2 },
    { name: 'Some other menu Item', id: 3 }
  ];

  public accountDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: false
    },
    position: {
      vertical: AUC_POSITIONS.ABOVE,
      horizontal: AUC_POSITIONS.AFTER
    }
  }

  onConnect(evt: AucConnectionState): void {
    console.log('Connected Wallet: ', evt);
  }

  onDisconnect(): void {
    console.log('Disconnected Wallet');
  }

  onOptionClicked(evt: AucAccountOption): void {
    console.log('Account option was clicked: ', evt);
  }

}
