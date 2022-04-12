import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { BasicTableComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import { AucTableModule } from '@applicature/components';


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
export class TableModule { }
