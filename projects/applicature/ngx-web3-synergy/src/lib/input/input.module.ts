import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DigitOnlyModule } from '@uiowa/digit-only';

import { AucInputComponent } from './input.component';


@NgModule({
  declarations: [
    AucInputComponent
  ],
  exports: [
    AucInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DigitOnlyModule
  ]
})
export class AucInputModule {
}
