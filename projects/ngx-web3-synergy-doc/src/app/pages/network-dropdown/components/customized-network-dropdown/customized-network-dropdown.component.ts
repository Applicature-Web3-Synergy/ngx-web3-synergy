/** Don't forget import { W3sNetworkDropdownModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { W3S_POSITIONS, W3sDropdownConfig } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-customized-network-dropdown',
  templateUrl: './customized-network-dropdown.component.html',
  styleUrls: [ './customized-network-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizedNetworkDropdownComponent {
  public networkDropdownConfig: W3sDropdownConfig = {
    overlay: {
      transparent: false,
      overlayClass: 'custom-network-dropdown-overlay-class'
    },
    position: {
      vertical: W3S_POSITIONS.ABOVE,
      horizontal: W3S_POSITIONS.BEFORE
    },
    class: `custom-network-dropdown-class`,
    minWidth: 250,
    minHeight: 200
  }

}
