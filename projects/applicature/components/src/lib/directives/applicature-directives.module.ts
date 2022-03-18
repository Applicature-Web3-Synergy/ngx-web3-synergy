import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureContentBodyDirective } from './applicature-content-body/applicature-content-body.directive';
import { ApplicatureTriggerDirective } from './applicature-trigger/applicature-trigger.directive';
import { ApplicatureCustomClassDirective } from './applicature-custom-class/applicature-custom-class.directive';
import { AucIdenticonDirective } from './identicon';
import { AucSetStylePropsDirective } from './set-style-props';



@NgModule({
  declarations: [
    ApplicatureContentBodyDirective,
    ApplicatureTriggerDirective,
    ApplicatureCustomClassDirective,
    AucIdenticonDirective,
    AucSetStylePropsDirective
  ],
  exports: [
    ApplicatureContentBodyDirective,
    ApplicatureTriggerDirective,
    ApplicatureCustomClassDirective,
    AucIdenticonDirective,
    AucSetStylePropsDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ApplicatureDirectivesModule {
}
