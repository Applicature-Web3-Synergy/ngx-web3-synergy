import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardModule } from 'ngx-clipboard';

import { ApplicatureCopyToClipboardComponent } from './applicature-copy-to-clipboard.component';
import { AucIconModule } from '../renamed/icon';

@NgModule({
  declarations: [
    ApplicatureCopyToClipboardComponent,
  ],
  exports: [
    ApplicatureCopyToClipboardComponent
  ],
  imports: [
    CommonModule,
    AucIconModule,
    ClipboardModule
  ]
})
export class ApplicatureCopyToClipboardModule {
}
