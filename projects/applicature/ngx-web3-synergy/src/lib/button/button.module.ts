import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { W3SpinnerModule } from '../spinner';
import { W3sIconModule } from '../icon';
import { W3sButtonComponent } from './button.component';
import { W3sDirectivesModule } from '../directives';

@NgModule({
  declarations: [
    W3sButtonComponent
  ],
  exports: [
    W3sButtonComponent
  ],
  imports: [
    CommonModule,
    W3sIconModule,
    W3sDirectivesModule,
    W3SpinnerModule
  ]
})
export class W3sButtonModule {
}
