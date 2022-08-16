export const BasicFaucetCodeTs =
  `/** Don't forget import { W3sFaucetModule } from '@applicature/ngx-web3-synergy'; to your module */
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { W3sFaucetConfig } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-faucet',
  templateUrl: './basic-faucet.component.html',
  styleUrls: ['./basic-faucet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicFaucetComponent{
  amount = 1;
  config: W3sFaucetConfig = {
    address: '0x9c77Cc2C6F2C2844D7F54c6aBeC14afbc928D0ED', // The address that the token is at.
    symbol: 'OCDR', // A ticker symbol or shorthand, up to 5 chars.
    decimals: 18, // The number of decimals in the token
    image: 'https://testnet.bscscan.com/images/main/empty-token.png' // A string url of the token logo
  }
}
`;
