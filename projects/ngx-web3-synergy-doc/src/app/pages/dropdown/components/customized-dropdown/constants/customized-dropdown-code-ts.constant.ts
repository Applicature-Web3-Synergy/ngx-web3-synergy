export const CustomizedDropdownCodeTs =
  `/** Don't forget import { W3sDropdownMenuModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  W3S_POSITIONS,
  W3sDropdownConfig,
  W3sHorizontalPosition,
  W3sVerticalPosition
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-customized-dropdown',
  templateUrl: './customized-dropdown.component.html',
  styleUrls: [ './customized-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizedDropdownComponent {
  public dropdownForm: FormGroup;
  public overlayForm: FormGroup;

  public isOpened = false;
  public verticalPositionsList: W3sVerticalPosition[] = [
    W3S_POSITIONS.ABOVE,
    W3S_POSITIONS.BELOW
  ];
  public horizontalPositionsList: W3sHorizontalPosition[] = [
    W3S_POSITIONS.BEFORE,
    W3S_POSITIONS.AFTER
  ];

  public customDropdownConfig: W3sDropdownConfig = {
    overlay: {
      transparent: true,
      overlayClass: 'app-custom-dropdown-overlay'
    },
    position: {
      vertical: W3S_POSITIONS.ABOVE,
      horizontal: W3S_POSITIONS.AFTER
    },
    class: 'custom-dropdown-menu',
    minWidth: 500,
    minHeight: 700
  }

  get dropdownList(): { title: string; value: number }[] {
    return Array.from({ length: 5 }).map((item, index) => {
      return {
        title: 'Item' + (index + 1),
        value: index + 1
      };
    });
  }

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  showHideDropdown(isOpen: boolean): void {
    this.isOpened = isOpen;
  }

  onDropdownOptionClicked(evt): void {
    this.showHideDropdown(false);

    console.log('Dropdown option clicked: ', evt);
  }

  private initForm(): void {
    this.dropdownForm = this.fb.group({
      transparent: [ true ],
      class: [ 'custom-dropdown' ],
      minWidth: [ 200, [ Validators.min(0) ] ],
      minHeight: [ 300, [ Validators.min(0) ] ],
      vertical: [ W3S_POSITIONS.ABOVE ],
      horizontal: [ W3S_POSITIONS.AFTER ]
    });

    this.overlayForm = this.fb.group({
      transparent: [ true ],
      customClass: [ 'custom-dropdown-overlay' ]
    });
  }

}
`;
