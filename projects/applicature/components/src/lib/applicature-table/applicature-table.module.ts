import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../icon/icon.module';
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
    IconModule,
    AucDirectivesModule
  ]
})
export class ApplicatureTableModule {
}
