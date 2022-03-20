import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AucRippleDirective } from './directives';


@NgModule({
  declarations: [
    AucRippleDirective
  ],
  exports: [
    AucRippleDirective
  ],
  imports: [
    CommonModule
  ]
})
export class AucRippleModule {
}
