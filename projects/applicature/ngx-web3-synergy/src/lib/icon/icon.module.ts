import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sIconComponent } from './icon.component';


@NgModule({
  declarations: [
    W3sIconComponent
  ],
  exports: [
    W3sIconComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class W3sIconModule {
}
