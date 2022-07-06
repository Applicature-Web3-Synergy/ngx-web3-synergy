import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AUC_POSITIONS, AucDropdownConfig } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'app-example-custom-dropdown-menu',
  templateUrl: './example-custom-dropdown-menu.component.html',
  styleUrls: ['./example-custom-dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleCustomDropdownMenuComponent {
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
