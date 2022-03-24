import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAlertComponent } from './alert.component';
import { AucDirectivesModule } from '../directives';


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
  ]
})
export class AucAlertModule {
}
