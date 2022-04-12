import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeedWalletConnectionComponent } from './need-wallet-connection.component';
import { AucConnectWalletModule } from '@applicature/components';



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
export class NeedWalletConnectionModule { }
