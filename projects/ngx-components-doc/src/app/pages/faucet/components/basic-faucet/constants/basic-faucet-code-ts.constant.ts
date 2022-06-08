export const BasicFaucetCodeTs =
  `/** Don't forget import { AucFaucetModule } from '@applicature/components'; to your module */
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { aucToWei } from '@applicature/components';

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

`;
