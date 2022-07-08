import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sConnectWalletModule } from '@applicature/ngx-web3-synergy';

import { NeedWalletConnectionComponent } from './need-wallet-connection.component';


@NgModule({
  declarations: [
    NeedWalletConnectionComponent
  ],
  exports: [
    NeedWalletConnectionComponent
  ],
  imports: [
    CommonModule,
    W3sConnectWalletModule
  ]
})
export class NeedWalletConnectionModule {
}
