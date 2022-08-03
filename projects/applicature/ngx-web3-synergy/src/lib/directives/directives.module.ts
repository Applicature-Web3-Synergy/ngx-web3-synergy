import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sContentBodyDirective } from './content-body';
import { W3sCustomClassDirective } from './custom-class';
import { W3sIdenticonDirective } from './identicon';
import { W3sSetStylePropsDirective } from './set-style-props';
import { W3sTriggerDirective } from './trigger';
import { W3sCheckElWidthDirective } from './check-el-width';


const directives = [
  W3sCheckElWidthDirective,
  W3sContentBodyDirective,
  W3sCustomClassDirective,
  W3sIdenticonDirective,
  W3sSetStylePropsDirective,
  W3sTriggerDirective
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
export class W3sDirectivesModule {
}
