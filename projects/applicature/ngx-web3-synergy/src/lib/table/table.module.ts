import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sIconModule } from '../icon';
import { W3sTableComponent } from './table.component';
import { W3sDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    W3sTableComponent
  ],
  exports: [
    W3sTableComponent
  ],
  imports: [
    CommonModule,
    W3sIconModule,
    W3sDirectivesModule
  ]
})
export class W3sTableModule {
}
