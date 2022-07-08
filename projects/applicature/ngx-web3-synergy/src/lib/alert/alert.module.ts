import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sAlertComponent } from './alert.component';
import { W3sDirectivesModule } from '../directives';
import { W3sIconModule } from '../icon';


@NgModule({
  declarations: [
    W3sAlertComponent,
  ],
  exports: [
    W3sAlertComponent,
  ],
  imports: [
    CommonModule,
    W3sDirectivesModule,
    W3sIconModule,
  ]
})
export class W3sAlertModule {
}
