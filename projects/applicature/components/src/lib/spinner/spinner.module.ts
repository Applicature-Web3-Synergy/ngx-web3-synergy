import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucSpinnerComponent } from './spinner.component';


@NgModule({
  declarations: [
    AucSpinnerComponent
  ],
  exports: [
    AucSpinnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AucSpinnerModule {
}
