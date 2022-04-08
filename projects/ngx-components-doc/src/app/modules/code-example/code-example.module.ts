import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeExampleComponent } from './code-example.component';
import { CodePrettyDirective } from './directives';
import { AucCopyToClipboardModule } from '@applicature/components';


@NgModule({
  declarations: [
    CodeExampleComponent,
    CodePrettyDirective
  ],
  exports: [
    CodeExampleComponent
  ],
  imports: [
    CommonModule,
    AucCopyToClipboardModule
  ]
})
export class CodeExampleModule {
}
