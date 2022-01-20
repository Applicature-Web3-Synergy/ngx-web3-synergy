import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DigitOnlyModule } from '@uiowa/digit-only';

import { AmountFieldComponent } from './amount-field.component';

@NgModule({
  declarations: [
    AmountFieldComponent
  ],
  exports: [
    AmountFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DigitOnlyModule,
  ],
})
export class AmountFieldModule {
}
