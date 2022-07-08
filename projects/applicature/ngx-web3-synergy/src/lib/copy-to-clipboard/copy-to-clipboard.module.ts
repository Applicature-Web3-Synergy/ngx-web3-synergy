import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sIconModule } from '../icon';
import { W3sCopyToClipboardComponent } from './copy-to-clipboard.component';
import { W3sCopyToClipboardDirective } from './directives';


@NgModule({
  declarations: [
    W3sCopyToClipboardComponent,
    W3sCopyToClipboardDirective,
  ],
  exports: [
    W3sCopyToClipboardComponent,
    W3sCopyToClipboardDirective
  ],
  imports: [
    CommonModule,
    W3sIconModule
  ]
})
export class W3sCopyToClipboardModule {
}
