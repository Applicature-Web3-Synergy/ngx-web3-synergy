import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureSpinnerComponent } from './applicature-spinner.component';


@NgModule({
  declarations: [
    ApplicatureSpinnerComponent
  ],
  exports: [
    ApplicatureSpinnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ApplicatureSpinnerModule {
}
