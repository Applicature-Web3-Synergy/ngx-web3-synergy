/** Dont forget import { AucNetworkDropdownModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AUC_POSITIONS, AucDropdownConfig } from '@applicature/components';


@Component({
  selector: 'doc-customized-network-dropdown',
  templateUrl: './customized-network-dropdown.component.html',
  styleUrls: [ './customized-network-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizedNetworkDropdownComponent {
  public networkDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: false,
      overlayClass: 'custom-network-dropdown-overlay-class'
    },
    position: {
      vertical: AUC_POSITIONS.ABOVE,
      horizontal: AUC_POSITIONS.BEFORE
    },
    class: `custom-network-dropdown-class`,
    minWidth: 250,
    minHeight: 200
  }

}
