import { Component } from '@angular/core';

import { aucToWei } from '../../../../../applicature/components/src/lib/helpers';

@Component({
  selector: 'app-example-faucet',
  templateUrl: './example-faucet.component.html',
  styleUrls: ['./example-faucet.component.scss']
})
export class ExampleFaucetComponent {

  amount: string = aucToWei(1, 18);
  contractToken = '0x9c77Cc2C6F2C2844D7F54c6aBeC14afbc928D0ED'

}
