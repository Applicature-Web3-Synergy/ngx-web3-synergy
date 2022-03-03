import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomClassDirective } from './custom-class/custom-class.directive';


@NgModule({
  declarations: [
    CustomClassDirective
  ],
  exports: [
    CustomClassDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ApplicatureDirectivesModule {
}
