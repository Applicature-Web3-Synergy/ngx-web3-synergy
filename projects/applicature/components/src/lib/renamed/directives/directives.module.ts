import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureContentBodyDirective } from './applicature-content-body/applicature-content-body.directive';

import { AucIdenticonDirective } from './identicon';
import { AucSetStylePropsDirective } from './set-style-props';
import { AucTriggerDirective } from './trigger';
import { AucCustomClassDirective } from './custom-class';

const directives = [
  AucIdenticonDirective,
  AucSetStylePropsDirective,
  AucTriggerDirective,
  AucCustomClassDirective,
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
