import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureContentBodyDirective } from './applicature-content-body/applicature-content-body.directive';

import { ApplicatureCustomClassDirective } from './applicature-custom-class/applicature-custom-class.directive';
import { AucIdenticonDirective } from './identicon';
import { AucSetStylePropsDirective } from './set-style-props';
import { AucTriggerDirective } from './trigger';

const directives = [
  AucIdenticonDirective,
  AucSetStylePropsDirective,
  AucTriggerDirective,
  ApplicatureCustomClassDirective,
  ApplicatureContentBodyDirective
];

@NgModule({
  declarations: [
    ...directives
  ],
  exports: [
    ...directives
  ],
  imports: [
    CommonModule
  ]
})
export class AucDirectivesModule {
}
