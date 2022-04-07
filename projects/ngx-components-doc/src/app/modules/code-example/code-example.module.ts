import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeExampleComponent } from './code-example.component';
import { CodePrettyDirective } from './directives';


@NgModule({
  declarations: [
    CodeExampleComponent,
    CodePrettyDirective
  ],
  exports: [
    CodeExampleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CodeExampleModule {
}
