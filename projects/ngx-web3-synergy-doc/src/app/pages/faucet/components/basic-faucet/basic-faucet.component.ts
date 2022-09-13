/** Don't forget import { W3sFaucetModule } from '@applicature/ngx-web3-synergy'; to your module */
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { W3sFaucetConfig } from '@applicature/ngx-web3-synergy';
import { AbiItem } from 'web3-utils';

import ERC20 from '../../../../smart-contracts/ERC20.json';

@Component({
  selector: 'doc-basic-faucet',
  templateUrl: './basic-faucet.component.html',
  styleUrls: ['./basic-faucet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicFaucetComponent{
  amount = 1;
  ERC20Json: AbiItem[] = ERC20 as AbiItem[];
  config: W3sFaucetConfig = {
    address: '0xd274A608456c79D8129B5187Fb2bD6ae118D83CF', // The address that the token is at.
    symbol: 'USDT', // A ticker symbol or shorthand, up to 5 chars.
    decimals: 18, // The number of decimals in the token
    image: 'https://testnet.bscscan.com/images/main/empty-token.png', // A string url of the token logo
    abi: this.ERC20Json  // Smart contract ABI
  }
}
