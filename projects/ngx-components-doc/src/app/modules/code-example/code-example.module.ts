import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucCopyToClipboardModule } from '@applicature/ngx-web3-synergy';

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
    CommonModule,
    AucCopyToClipboardModule
  ]
})
export class CodeExampleModule {
}
