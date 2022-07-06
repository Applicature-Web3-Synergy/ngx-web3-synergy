import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucCopyToClipboardModule } from '@applicature/ngx-web3-synergy';

import { CopyToClipboardRoutingModule } from './copy-to-clipboard-routing.module';
import { CopyToClipboardComponent } from './copy-to-clipboard.component';
import { BasicCopyToClipboardComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    CopyToClipboardComponent,
    BasicCopyToClipboardComponent
  ],
  imports: [
    CommonModule,
    CopyToClipboardRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    AucCopyToClipboardModule
  ]
})
export class CopyToClipboardModule {
}
