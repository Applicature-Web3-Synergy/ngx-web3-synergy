import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureProgressBarComponent } from './applicature-progress-bar.component';


@NgModule({
  declarations: [
    ApplicatureProgressBarComponent
  ],
  exports: [
    ApplicatureProgressBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ApplicatureProgressBarModule {
}
