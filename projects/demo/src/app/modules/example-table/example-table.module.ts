import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sTableModule } from '@applicature/ngx-web3-synergy';

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
    W3sTableModule
  ]
})
export class ExampleTableModule { }
