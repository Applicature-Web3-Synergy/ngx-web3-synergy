import { ChangeDetectionStrategy, Component } from '@angular/core';

import { W3sFaucetConfig } from '@applicature/ngx-web3-synergy';
import { AbiItem } from 'web3-utils';

import ERC20 from '../../smart-contracts/ERC20.json';


@Component({
  selector: 'app-example-faucet',
  templateUrl: './example-faucet.component.html',
  styleUrls: ['./example-faucet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFaucetComponent {
  amount = 1;
  ERC20Json: AbiItem[] = ERC20 as AbiItem[];
  config: W3sFaucetConfig = {
    address: '0x9c77Cc2C6F2C2844D7F54c6aBeC14afbc928D0ED', // The address that the token is at.
    symbol: 'OCDR', // A ticker symbol or shorthand, up to 5 chars.
    decimals: 18, // The number of decimals in the token
    image: 'https://testnet.bscscan.com/images/main/empty-token.png', // A string url of the token logo
    abi: this.ERC20Json  // Smart contract ABI
  }

}
