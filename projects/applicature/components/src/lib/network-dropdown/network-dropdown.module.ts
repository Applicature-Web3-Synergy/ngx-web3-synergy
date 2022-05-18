import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule } from '../button';
import { AucPipesModule } from '../pipes';
import { AucNetworkDropdownComponent } from './network-dropdown.component';
import { AucDropdownMenuModule } from '../dropdown-menu';
import { AucDirectivesModule } from '../directives';
import { AucIconModule } from '../icon';


@NgModule({
  declarations: [
    AucNetworkDropdownComponent
  ],
  exports: [
    AucNetworkDropdownComponent
  ],
  imports: [
    CommonModule,
    AucButtonModule,
    AucPipesModule,
    AucDropdownMenuModule,
    AucDirectivesModule,
    AucIconModule,
  ]
})
export class AucNetworkDropdownModule {
}
