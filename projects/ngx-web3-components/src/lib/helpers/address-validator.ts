import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { isAddress } from './index';

export function addressValidator(error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }

    return !isAddress(control.value) ? error : null;
  };
}
