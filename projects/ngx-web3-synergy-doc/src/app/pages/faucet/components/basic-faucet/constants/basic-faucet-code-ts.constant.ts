export const BasicFaucetCodeTs =
  `/** Don't forget import { W3sFaucetModule } from '@applicature/ngx-web3-synergy'; to your module */
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { w3sToWei } from '@applicature/ngx-web3-synergy';

import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'doc-basic-faucet',
  templateUrl: './basic-faucet.component.html',
  styleUrls: ['./basic-faucet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicFaucetComponent{
  amount: string = w3sToWei(1, 18);
  contractToken: string = environment.faucetTokenAddress;
}

`;
