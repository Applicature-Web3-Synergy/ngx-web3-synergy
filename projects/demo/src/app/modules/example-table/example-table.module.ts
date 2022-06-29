import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucTableModule } from '@applicature/components';

import { ExampleTableComponent } from './example-table.component';


@NgModule({
  declarations: [
    ExampleTableComponent
  ],
  exports: [
    ExampleTableComponent
  ],
  imports: [
    CommonModule,
    AucTableModule
  ]
})
export class ExampleTableModule { }
