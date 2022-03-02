import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';

import { ApplicatureTableComponent } from './applicature-table.component';
import { ApplicatureDirectivesModule } from '../applicature-directives';


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
    ApplicatureDirectivesModule
  ]
})
export class ApplicatureTableModule { }
