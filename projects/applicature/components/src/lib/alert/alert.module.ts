import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { AucDirectivesModule } from '../renamed/directives';

@NgModule({
  declarations: [
    AlertComponent,
  ],
  exports: [
    AlertComponent,
  ],
  imports: [
    CommonModule,
    AucDirectivesModule,
  ]
})
export class AlertModule {
}
