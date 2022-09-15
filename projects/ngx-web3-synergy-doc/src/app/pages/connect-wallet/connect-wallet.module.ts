import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sConnectWalletModule } from '@applicature/ngx-web3-synergy';
import { MatTabsModule } from '@angular/material/tabs';

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
import { TableOfContentsModule } from '../../components/table-of-contents/table-of-contents.module';

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
    W3sConnectWalletModule,
    MatTabsModule,
    TableOfContentsModule
  ]
})
export class ConnectWalletModule {
}
