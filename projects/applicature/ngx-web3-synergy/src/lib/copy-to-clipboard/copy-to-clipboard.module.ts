import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucIconModule } from '../icon';
import { AucCopyToClipboardComponent } from './copy-to-clipboard.component';
import { CopyToClipboardDirective } from './directives';


@NgModule({
  declarations: [
    AucCopyToClipboardComponent,
    CopyToClipboardDirective,
  ],
  exports: [
    AucCopyToClipboardComponent,
    CopyToClipboardDirective
  ],
  imports: [
    CommonModule,
    AucIconModule
  ]
})
export class AucCopyToClipboardModule {
}
