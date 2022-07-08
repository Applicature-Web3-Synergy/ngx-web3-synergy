import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sOverlayComponent } from './overlay.component';
import { W3sDirectivesModule } from '../directives';


@NgModule({
  declarations: [
    W3sOverlayComponent
  ],
  exports: [
    W3sOverlayComponent
  ],
  imports: [
    CommonModule,
    W3sDirectivesModule
  ]
})
export class W3sOverlayModule {
}
