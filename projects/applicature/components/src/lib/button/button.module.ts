import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AucSpinnerModule } from '../spinner';
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
    AucSpinnerModule
  ]
})
export class AucButtonModule {
}
