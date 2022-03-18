import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { ApplicatureDirectivesModule } from '../directives';

@NgModule({
  declarations: [
    AlertComponent,
  ],
  exports: [
    AlertComponent,
  ],
  imports: [
    CommonModule,
    ApplicatureDirectivesModule,
  ]
})
export class AlertModule {
}
