import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucIconModule } from '../renamed/icon';
import { ApplicatureTableComponent } from './applicature-table.component';
import { AucDirectivesModule } from '../renamed/directives';


@NgModule({
  declarations: [
    ApplicatureTableComponent
  ],
  exports: [
    ApplicatureTableComponent
  ],
  imports: [
    CommonModule,
    AucIconModule,
    AucDirectivesModule
  ]
})
export class ApplicatureTableModule {
}
