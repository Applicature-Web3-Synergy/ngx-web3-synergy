import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardModule } from 'ngx-clipboard';

import { AucIconModule } from '../icon';
import { AucCopyToClipboardComponent } from './copy-to-clipboard.component';


@NgModule({
  declarations: [
    AucCopyToClipboardComponent,
  ],
  exports: [
    AucCopyToClipboardComponent
  ],
  imports: [
    CommonModule,
    AucIconModule,
    ClipboardModule
  ]
})
export class AucCopyToClipboardModule {
}
