import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sConnectWalletModule } from '@applicature/ngx-web3-synergy';

import { ExampleConnectWalletComponent } from './example-connect-wallet.component';


@NgModule({
  declarations: [
    ExampleConnectWalletComponent
  ],
  exports: [
    ExampleConnectWalletComponent
  ],
  imports: [
    CommonModule,
    W3sConnectWalletModule
  ]
})
export class ExampleConnectWalletModule { }
