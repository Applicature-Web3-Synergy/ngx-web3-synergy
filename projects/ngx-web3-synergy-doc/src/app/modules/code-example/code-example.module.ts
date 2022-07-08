import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sCopyToClipboardModule } from '@applicature/ngx-web3-synergy';

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
    W3sCopyToClipboardModule
  ]
})
export class CodeExampleModule {
}
