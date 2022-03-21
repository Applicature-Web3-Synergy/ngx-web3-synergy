import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule } from '../button';
import { AucPipesModule } from '../pipes';
import { AucNetworkDropdownComponent } from './network-dropdown.component';
import { AucDropdownMenuModule } from '../dropdown-menu';
import { AucDirectivesModule } from '../directives';
import { AucNoNetworkConfigComponent } from './no-network-config';


@NgModule({
  declarations: [
    AucNetworkDropdownComponent,
    AucNoNetworkConfigComponent
  ],
  exports: [
    AucNetworkDropdownComponent,
    AucNoNetworkConfigComponent
  ],
  imports: [
    CommonModule,
    AucButtonModule,
    AucPipesModule,
    AucDropdownMenuModule,
    AucDirectivesModule,
  ]
})
export class AucNetworkDropdownModule {
}
