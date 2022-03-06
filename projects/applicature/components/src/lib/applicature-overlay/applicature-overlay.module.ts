import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicatureOverlayComponent } from './applicature-overlay.component';
import { ApplicatureDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    ApplicatureOverlayComponent
  ],
  exports: [
    ApplicatureOverlayComponent
  ],
  imports: [
    CommonModule,
    ApplicatureDirectivesModule
  ]
})
export class ApplicatureOverlayModule {
}
