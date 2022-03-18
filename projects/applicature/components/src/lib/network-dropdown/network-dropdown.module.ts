import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucButtonModule } from '../renamed/button';
import { PipesModule } from '../pipes';
import { NetworkDropdownComponent } from './network-dropdown.component';
import { ApplicatureDropdownMenuModule } from '../applicature-dropdown-menu';
import { AucDirectivesModule } from '../renamed/directives';
import { AucNoNetworkConfigComponent } from './no-network-config/no-network-config.component';

@NgModule({
  declarations: [
    NetworkDropdownComponent,
    AucNoNetworkConfigComponent
  ],
  exports: [
    NetworkDropdownComponent,
    AucNoNetworkConfigComponent
  ],
  imports: [
    CommonModule,
    AucButtonModule,
    PipesModule,
    ApplicatureDropdownMenuModule,
    AucDirectivesModule,
  ]
})
export class NetworkDropdownModule {
}
