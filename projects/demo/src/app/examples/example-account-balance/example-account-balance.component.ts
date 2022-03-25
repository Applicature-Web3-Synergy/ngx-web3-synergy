import { Component } from '@angular/core';

import { AUC_BALANCE_APPEARANCE, AUC_IDENTICON_POSITION } from '@applicature/components';
import { AS_COLOR_GROUP } from '@applicature/styles';


@Component({
  selector: 'app-example-account-balance',
  templateUrl: './example-account-balance.component.html',
  styleUrls: [ './example-account-balance.component.scss' ]
})
export class ExampleAccountBalanceComponent {
  public BALANCE_APPEARANCE = AUC_BALANCE_APPEARANCE;
  public COLORS = AS_COLOR_GROUP;
  public IDENTICON_POSITION = AUC_IDENTICON_POSITION;

  onAddressClick() {
    console.log('Address button was clicked');
  }
}
