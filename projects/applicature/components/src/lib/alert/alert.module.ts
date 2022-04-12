import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAlertComponent } from './alert.component';
import { AucDirectivesModule } from '../directives';
import { AucIconModule } from '../icon';


@NgModule({
  declarations: [
    AucAlertComponent,
  ],
  exports: [
    AucAlertComponent,
  ],
  imports: [
    CommonModule,
    AucDirectivesModule,
    AucIconModule,
  ]
})
export class AucAlertModule {
}
