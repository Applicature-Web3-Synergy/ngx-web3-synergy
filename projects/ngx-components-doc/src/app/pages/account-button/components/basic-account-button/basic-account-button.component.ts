/** Dont forget import { AucAccountButtonModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AUC_POSITIONS, AucAccountOption, AucDropdownConfig } from '@applicature/components';


@Component({
  selector: 'doc-basic-account-button',
  templateUrl: './basic-account-button.component.html',
  styleUrls: [ './basic-account-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicAccountButtonComponent {
  public accountOptions: AucAccountOption[] = [
    { name: 'My Account', id: 1 },
    { name: 'Some menu Item', id: 2 },
    { name: 'Some other menu Item', id: 3 }
  ];

  public accountDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: false
    },
    position: {
      vertical: AUC_POSITIONS.ABOVE,
      horizontal: AUC_POSITIONS.AFTER
    }
  }

  onOptionClick(evt: AucAccountOption) {
    console.log('Account button option clicked: ', evt);
  }
}
