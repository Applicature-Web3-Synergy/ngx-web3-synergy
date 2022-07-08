import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sButtonModule } from '../button';
import { W3sPipesModule } from '../pipes';
import { W3sNetworkDropdownComponent } from './network-dropdown.component';
import { W3sDropdownMenuModule } from '../dropdown-menu';
import { W3sDirectivesModule } from '../directives';
import { W3sIconModule } from '../icon';


@NgModule({
  declarations: [
    W3sNetworkDropdownComponent
  ],
  exports: [
    W3sNetworkDropdownComponent
  ],
  imports: [
    CommonModule,
    W3sButtonModule,
    W3sPipesModule,
    W3sDropdownMenuModule,
    W3sDirectivesModule,
    W3sIconModule,
  ]
})
export class W3sNetworkDropdownModule {
}
