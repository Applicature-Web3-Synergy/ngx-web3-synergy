/** Don't forget import { W3sAccountButtonModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { W3S_POSITIONS, W3sAccountOption, W3sDropdownConfig } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-account-button',
  templateUrl: './basic-account-button.component.html',
  styleUrls: [ './basic-account-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicAccountButtonComponent {
  public accountOptions: W3sAccountOption[] = [
    { name: 'My Account', id: '1' },
    { name: 'Some menu Item', id: '2' },
    { name: 'Some other menu Item', id: '3' }
  ];

  public accountDropdownConfig: W3sDropdownConfig = {
    overlay: {
      transparent: false
    },
    position: {
      vertical: W3S_POSITIONS.ABOVE,
      horizontal: W3S_POSITIONS.AFTER
    }
  }

  optionClicked(evt: W3sAccountOption) {
    console.log('Account button option clicked: ', evt);
  }
}
