/** Dont forget import { AucDropdownMenuModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'doc-basic-dropdown',
  templateUrl: './basic-dropdown.component.html',
  styleUrls: [ './basic-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicDropdownComponent {
  public isOpened = false;

  get dropdownList(): { title: string; value: number }[] {
    return Array.from({ length: 5 }).map((item, index) => {
      return {
        title: 'Custom dropdown item' + (index + 1),
        value: index + 1
      };
    });
  }

  showHideDropdown(isOpen: boolean): void {
    this.isOpened = isOpen;
  }

  onDropdownOptionClicked(evt): void {
    this.showHideDropdown(false);

    console.log('Dropdown option clicked: ', evt);
  }
}
