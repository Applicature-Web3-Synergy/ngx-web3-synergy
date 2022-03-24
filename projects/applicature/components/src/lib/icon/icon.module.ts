import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucIconComponent } from './icon.component';


@NgModule({
  declarations: [
    AucIconComponent
  ],
  exports: [
    AucIconComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class AucIconModule {
}
