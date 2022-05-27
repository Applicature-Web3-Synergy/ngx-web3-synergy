import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucNetworkDropdownModule } from '@applicature/components';

import { NetworkDropdownRoutingModule } from './network-dropdown-routing.module';
import { NetworkDropdownComponent } from './network-dropdown.component';
import { BasicNetworkDropdownComponent, CustomizedNetworkDropdownComponent } from './components';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { NeedWalletConnectionModule } from '../../modules/need-wallet-connection';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';


@NgModule({
  declarations: [
    NetworkDropdownComponent,
    BasicNetworkDropdownComponent,
    CustomizedNetworkDropdownComponent
  ],
  imports: [
    CommonModule,
    NetworkDropdownRoutingModule,
    ComponentViewerModule,
    NeedWalletConnectionModule,
    ExampleCardModule,
    AucNetworkDropdownModule
  ]
})
export class NetworkDropdownModule {
}
