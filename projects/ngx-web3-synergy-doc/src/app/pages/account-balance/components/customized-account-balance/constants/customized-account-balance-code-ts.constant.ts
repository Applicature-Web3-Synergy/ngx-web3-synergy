export const CustomizedAccountBalanceCodeTs =
`/** Don't forget import { W3sAccountBalanceModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { W3S_BALANCE_APPEARANCE, W3S_IDENTICON_POSITION } from '@applicature/ngx-web3-synergy';
import { AS_COLOR_GROUP } from '@applicature/styles';


@Component({
  selector: 'doc-customized-account-balance',
  templateUrl: './customized-account-balance.component.html',
  styleUrls: [ './customized-account-balance.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizedAccountBalanceComponent {
  public BALANCE_APPEARANCE = W3S_BALANCE_APPEARANCE;
  public COLORS = AS_COLOR_GROUP;
  public IDENTICON_POSITION = W3S_IDENTICON_POSITION;
  public balanceForm: FormGroup;
  public accountAddressForm: FormGroup;

  public balanceAppearanceList: W3S_BALANCE_APPEARANCE[] = [
    this.BALANCE_APPEARANCE.TRANSLUCENT,
    this.BALANCE_APPEARANCE.TRANSPARENT
  ];

  public colorsList: AS_COLOR_GROUP[] = [
    this.COLORS.WHITE,
    this.COLORS.BLUE,
    this.COLORS.GREEN,
    this.COLORS.GRAY,
    this.COLORS.ORANGE,
    this.COLORS.RED
  ];

  public identiconPositionsList: W3S_IDENTICON_POSITION[] = [
    this.IDENTICON_POSITION.LEFT,
    this.IDENTICON_POSITION.RIGHT
  ];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.balanceForm = this.fb.group({
      color: [ this.COLORS.GRAY ],
      appearance: [ this.BALANCE_APPEARANCE.TRANSLUCENT ],
      showCurrency: [ true ],
      showAddress: [ true ]
    });

    this.accountAddressForm = this.fb.group({
      disabled: [ false ],
      showIdenticon: [ true ],
      identiconPosition: [ this.IDENTICON_POSITION.LEFT ],
      color: [ this.COLORS.GREEN ]
    })
  }

  accountClicked(): void {
    console.log('Account balance address button was clicked');
  }
}
`;
