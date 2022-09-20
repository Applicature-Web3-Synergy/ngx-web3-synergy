import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sTableModule } from '@applicature/ngx-web3-synergy';
import { MatTabsModule } from '@angular/material/tabs';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { BasicTableComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { TableOfContentsModule } from '../../components/table-of-contents/table-of-contents.module';


@NgModule({
  declarations: [
    TableComponent,
    BasicTableComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    W3sTableModule,
    MatTabsModule,
    TableOfContentsModule
  ]
})
export class TableModule {
}
