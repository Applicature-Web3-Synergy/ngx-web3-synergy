import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureOverlayComponent } from './applicature-overlay.component';
import { AucDirectivesModule } from '../renamed/directives';


@NgModule({
  declarations: [
    ApplicatureOverlayComponent
  ],
  exports: [
    ApplicatureOverlayComponent
  ],
  imports: [
    CommonModule,
    AucDirectivesModule
  ]
})
export class ApplicatureOverlayModule {
}
