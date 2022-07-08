import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3SpinnerComponent } from './spinner.component';


@NgModule({
  declarations: [
    W3SpinnerComponent
  ],
  exports: [
    W3SpinnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class W3SpinnerModule {
}
