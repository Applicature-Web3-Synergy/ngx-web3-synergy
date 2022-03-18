import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplicatureSpinnerModule } from '../../applicature-spinner';
import { AucIconModule } from '../icon';
import { AucButtonComponent } from './button.component';
import { AucDirectivesModule } from '../directives';

@NgModule({
  declarations: [
    AucButtonComponent
  ],
  exports: [
    AucButtonComponent
  ],
  imports: [
    CommonModule,
    AucIconModule,
    AucDirectivesModule,
    ApplicatureSpinnerModule
  ]
})
export class AucButtonModule {
}
