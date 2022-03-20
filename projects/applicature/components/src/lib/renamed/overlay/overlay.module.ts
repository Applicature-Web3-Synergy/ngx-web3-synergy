import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucOverlayComponent } from './overlay.component';
import { AucDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    AucOverlayComponent
  ],
  exports: [
    AucOverlayComponent
  ],
  imports: [
    CommonModule,
    AucDirectivesModule
  ]
})
export class AucOverlayModule {
}
