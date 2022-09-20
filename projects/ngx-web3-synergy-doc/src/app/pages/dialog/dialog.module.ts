import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { W3sButtonModule, W3sDialogModule, W3sModalsModule } from '@applicature/ngx-web3-synergy';
import { MatTabsModule } from '@angular/material/tabs';

import { DialogRoutingModule } from './dialog-routing.module';
import { DialogComponent } from './dialog.component';
import { BasicDialogComponent, CustomDialogComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { TableOfContentsModule } from '../../components/table-of-contents/table-of-contents.module';


@NgModule({
  declarations: [
    DialogComponent,
    BasicDialogComponent,
    CustomDialogComponent
  ],
  imports: [
    CommonModule,
    DialogRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    W3sButtonModule,
    W3sDialogModule,
    W3sModalsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    TableOfContentsModule
  ]
})
export class DialogModule {
}
