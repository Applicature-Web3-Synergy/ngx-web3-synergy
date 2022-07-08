import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { W3sRippleDirective } from './directives';


@NgModule({
  declarations: [
    W3sRippleDirective
  ],
  exports: [
    W3sRippleDirective
  ],
  imports: [
    CommonModule
  ]
})
export class W3RippleModule {
}
