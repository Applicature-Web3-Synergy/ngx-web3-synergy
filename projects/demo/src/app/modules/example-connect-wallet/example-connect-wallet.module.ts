import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucConnectWalletModule } from '@applicature/components';

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
    AucConnectWalletModule
  ]
})
export class ExampleConnectWalletModule { }
