import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sConnectWalletModule } from '@applicature/ngx-web3-synergy';

import { ConnectWalletRoutingModule } from './connect-wallet-routing.module';
import { ConnectWalletComponent } from './connect-wallet.component';
import { ComponentViewerModule } from '../../modules/component-viewer/component-viewer.module';
import { ExampleCardModule } from '../../modules/example-card/example-card.module';
import {
  BasicConnectWalletComponent,
  ConnectWalletAsIconComponent,
  ConnectWalletWithNetworkComponent,
  CustomConnectButtonComponent,
  CustomConnectWalletComponent
} from './components';


@NgModule({
  declarations: [
    ConnectWalletComponent,
    BasicConnectWalletComponent,
    ConnectWalletAsIconComponent,
    ConnectWalletWithNetworkComponent,
    CustomConnectWalletComponent,
    CustomConnectButtonComponent
  ],
  imports: [
    CommonModule,
    ConnectWalletRoutingModule,
    ComponentViewerModule,
    ExampleCardModule,
    W3sConnectWalletModule
  ]
})
export class ConnectWalletModule {
}
