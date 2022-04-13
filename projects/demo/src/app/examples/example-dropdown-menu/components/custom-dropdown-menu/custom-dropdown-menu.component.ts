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
    class: 'custom-dropdown-menu',
    minWidth: 500,
    minHeight: 500
  }

  get dropdownList(): { title: string; value: number }[] {
    return Array.from({ length: 3 }).map((item, index) => {
      return {
        title: `Item ${index + 1}`,
        value: index + 1
      };
    });
  }

  showHideDropdown(isOpen: boolean): void {
    this.isOpenedCustomDropdownMenu = isOpen;
  }

  onDropdownOptionClicked(evt): void {
    this.showHideDropdown(false);

    console.log('Dropdown option clicked: ', evt);
  }
}
