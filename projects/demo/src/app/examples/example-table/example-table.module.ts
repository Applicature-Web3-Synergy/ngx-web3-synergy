import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureTableModule } from '@applicature/components';

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
    ApplicatureTableModule
  ]
})
export class ExampleTableModule { }
