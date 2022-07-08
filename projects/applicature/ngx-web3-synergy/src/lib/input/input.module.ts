import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DigitOnlyModule } from '@uiowa/digit-only';

import { W3sInputComponent } from './input.component';


@NgModule({
  declarations: [
    W3sInputComponent
  ],
  exports: [
    W3sInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DigitOnlyModule
  ]
})
export class W3sInputModule {
}
