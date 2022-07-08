import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sProgressBarComponent } from './progress-bar.component';


@NgModule({
  declarations: [
    W3sProgressBarComponent
  ],
  exports: [
    W3sProgressBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class W3sProgressBarModule {
}
