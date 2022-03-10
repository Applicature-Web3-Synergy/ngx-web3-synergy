import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardModule } from 'ngx-clipboard';

import { ApplicatureCopyToClipboardComponent } from './applicature-copy-to-clipboard.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [
    ApplicatureCopyToClipboardComponent,
  ],
  exports: [
    ApplicatureCopyToClipboardComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    ClipboardModule
  ]
})
export class ApplicatureCopyToClipboardModule {
}
