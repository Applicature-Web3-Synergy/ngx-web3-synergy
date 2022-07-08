/** Don't forget import { W3sAccountBalanceModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { W3S_BALANCE_APPEARANCE, W3S_IDENTICON_POSITION } from '@applicature/ngx-web3-synergy';
import { AS_COLOR_GROUP } from '@applicature/styles';


@Component({
  selector: 'doc-basic-account-balance',
  templateUrl: './basic-account-balance.component.html',
  styleUrls: [ './basic-account-balance.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicAccountBalanceComponent {
  public BALANCE_APPEARANCE = W3S_BALANCE_APPEARANCE;
  public COLORS = AS_COLOR_GROUP;
  public IDENTICON_POSITION = W3S_IDENTICON_POSITION;

  accountClicked(): void {
    console.log('Account balance address button was clicked');
  }
}
