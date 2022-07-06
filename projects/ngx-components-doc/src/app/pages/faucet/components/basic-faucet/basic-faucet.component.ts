/** Don't forget import { AucFaucetModule } from '@applicature/ngx-web3-synergy'; to your module */
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { aucToWei } from '@applicature/ngx-web3-synergy';

import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'doc-basic-faucet',
  templateUrl: './basic-faucet.component.html',
  styleUrls: ['./basic-faucet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicFaucetComponent{
  amount: string = aucToWei(1, 18);
  contractToken: string = environment.faucetTokenAddress;
}
