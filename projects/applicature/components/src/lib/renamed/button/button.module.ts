import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplicatureSpinnerModule } from '../../applicature-spinner';
import { IconModule } from '../../icon';
import { AucButtonComponent } from './button.component';
import { ApplicatureDirectivesModule } from '../../directives';

@NgModule({
  declarations: [
    AucButtonComponent
  ],
  exports: [
    AucButtonComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    ApplicatureDirectivesModule,
    ApplicatureSpinnerModule
  ]
})
export class AucButtonModule {
}
