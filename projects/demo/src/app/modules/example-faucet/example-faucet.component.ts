import { ChangeDetectionStrategy, Component } from '@angular/core';

import { w3sToWei } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'app-example-faucet',
  templateUrl: './example-faucet.component.html',
  styleUrls: ['./example-faucet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFaucetComponent {
  amount: string = w3sToWei(1, 18);
  contractToken = '0x9c77Cc2C6F2C2844D7F54c6aBeC14afbc928D0ED'

}
