import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucProgressBarComponent } from './progress-bar.component';


@NgModule({
  declarations: [
    AucProgressBarComponent
  ],
  exports: [
    AucProgressBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AucProgressBarModule {
}
