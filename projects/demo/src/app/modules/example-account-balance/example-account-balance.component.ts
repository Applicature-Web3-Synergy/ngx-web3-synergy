import { ChangeDetectionStrategy, Component } from '@angular/core';

import { W3S_BALANCE_APPEARANCE, W3S_IDENTICON_POSITION } from '@applicature/ngx-web3-synergy';
import { AS_COLOR_GROUP } from '@applicature/styles';


@Component({
  selector: 'app-example-account-balance',
  templateUrl: './example-account-balance.component.html',
  styleUrls: [ './example-account-balance.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleAccountBalanceComponent {
  public BALANCE_APPEARANCE = W3S_BALANCE_APPEARANCE;
  public COLORS = AS_COLOR_GROUP;
  public IDENTICON_POSITION = W3S_IDENTICON_POSITION;

  accountClicked() {
    console.log('Account button was clicked');
  }
}
