import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureContentBodyDirective } from './applicature-content-body/applicature-content-body.directive';
import { ApplicatureTriggerDirective } from './applicature-trigger/applicature-trigger.directive';
import { ApplicatureCustomClassDirective } from './applicature-custom-class/applicature-custom-class.directive';
import { AucIdenticonDirective } from './identicon';


@NgModule({
  declarations: [
    ApplicatureContentBodyDirective,
    ApplicatureTriggerDirective,
    ApplicatureCustomClassDirective,
    AucIdenticonDirective,
  ],
  exports: [
    ApplicatureContentBodyDirective,
    ApplicatureTriggerDirective,
    ApplicatureCustomClassDirective,
    AucIdenticonDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ApplicatureDirectivesModule {
}
