import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { PipesModule } from '../pipes';
import { NetworkDropdownComponent } from './network-dropdown.component';

@NgModule({
  declarations: [
    NetworkDropdownComponent,
  ],
  exports: [
    NetworkDropdownComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    ButtonModule,
    PipesModule,
  ]
})
export class NetworkDropdownModule {
}
