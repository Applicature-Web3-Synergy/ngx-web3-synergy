import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucIconModule } from '../icon';
import { AucTableComponent } from './table.component';
import { AucDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    AucTableComponent
  ],
  exports: [
    AucTableComponent
  ],
  imports: [
    CommonModule,
    AucIconModule,
    AucDirectivesModule
  ]
})
export class AucTableModule {
}
