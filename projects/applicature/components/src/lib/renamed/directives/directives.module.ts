import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucContentBodyDirective } from './content-body';
import { AucCustomClassDirective } from './custom-class';
import { AucIdenticonDirective } from './identicon';
import { AucSetStylePropsDirective } from './set-style-props';
import { AucTriggerDirective } from './trigger';


const directives = [
  AucContentBodyDirective,
  AucCustomClassDirective,
  AucIdenticonDirective,
  AucSetStylePropsDirective,
  AucTriggerDirective
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
