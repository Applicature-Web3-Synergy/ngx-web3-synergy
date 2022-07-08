export const ConnectWalletAsIconCodeTs =
`/** Don't forget import { W3sConnectWalletModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  W3S_CONNECT_WALLET_APPEARANCE,
  W3S_POSITIONS,
  W3sAccountOption,
  W3sConnectionState,
  W3sDropdownConfig
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-connect-wallet-as-icon',
  templateUrl: './connect-wallet-as-icon.component.html',
  styleUrls: [ './connect-wallet-as-icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectWalletAsIconComponent {
  public WALLET_APPEARANCE = W3S_CONNECT_WALLET_APPEARANCE;

  public accountOptions: W3sAccountOption[] = [
    { name: 'My Account', id: '1' },
    { name: 'Some menu Item', id: '2' },
    { name: 'Some other menu Item', id: '3' }
  ];

  public accountDropdownConfig: W3sDropdownConfig = {
    overlay: {
      transparent: false
    },
    position: {
      vertical: W3S_POSITIONS.ABOVE,
      horizontal: W3S_POSITIONS.AFTER
    }
  }

  connected(evt: W3sConnectionState): void {
    console.log('Connected Wallet: ', evt);
  }

  disconnected(): void {
    console.log('Disconnected Wallet');
  }

  optionClicked(evt: W3sAccountOption): void {
    console.log('Account option was clicked: ', evt);
  }

}
`;
