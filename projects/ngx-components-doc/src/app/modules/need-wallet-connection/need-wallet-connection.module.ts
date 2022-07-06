import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucConnectWalletModule } from '@applicature/ngx-web3-synergy';

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
    AucConnectWalletModule
  ]
})
export class NeedWalletConnectionModule {
}
