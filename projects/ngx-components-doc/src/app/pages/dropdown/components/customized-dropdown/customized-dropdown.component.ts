/** Dont forget import { AucDropdownMenuModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  AUC_POSITIONS,
  AucDropdownConfig,
  AucHorizontalPosition,
  AucVerticalPosition
} from '@applicature/components';


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
  public verticalPositionsList: AucVerticalPosition[] = [
    AUC_POSITIONS.ABOVE,
    AUC_POSITIONS.BELOW
  ];
  public horizontalPositionsList: AucHorizontalPosition[] = [
    AUC_POSITIONS.BEFORE,
    AUC_POSITIONS.AFTER
  ];

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
      minWidth: [ 150, [ Validators.min(0) ] ],
      minHeight: [ 180, [ Validators.min(0) ] ],
      vertical: [ AUC_POSITIONS.ABOVE ],
      horizontal: [ AUC_POSITIONS.AFTER ]
    });

    this.overlayForm = this.fb.group({
      transparent: [ true ],
      customClass: [ 'custom-dropdown-overlay' ]
    });
  }
}
