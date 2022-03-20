import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  AucDropdownConfig,
  AUC_POSITIONS
} from '@applicature/components';


@Component({
  selector: 'app-custom-dropdown-menu',
  templateUrl: './custom-dropdown-menu.component.html',
  styleUrls: [ './custom-dropdown-menu.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDropdownMenuComponent {
  public isOpenedCustomDropdownMenu = false;

  public customDropdownConfig: AucDropdownConfig = {
    overlay: {
      transparent: true,
      overlayClass: 'app-custom-dropdown-overlay'
    },
    position: {
      vertical: AUC_POSITIONS.ABOVE,
      horizontal: AUC_POSITIONS.AFTER
    },
    class: 'custom-dropdown-menu'
  }

  showCustomDropdownMenu(isOpen: boolean): void {
    this.isOpenedCustomDropdownMenu = isOpen;
  }
}
