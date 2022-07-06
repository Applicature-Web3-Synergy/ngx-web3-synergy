import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucTableModule } from '@applicature/ngx-web3-synergy';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { BasicTableComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


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
    AucTableModule
  ]
})
export class TableModule {
}
