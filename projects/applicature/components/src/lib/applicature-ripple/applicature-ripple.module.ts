import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplicatureRippleDirective } from './directives';


@NgModule({
  declarations: [
    ApplicatureRippleDirective
  ],
  exports: [
    ApplicatureRippleDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ApplicatureRippleModule {
}
