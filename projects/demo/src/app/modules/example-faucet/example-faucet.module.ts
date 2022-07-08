import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sFaucetModule } from '@applicature/ngx-web3-synergy';

import { ExampleFaucetComponent } from './example-faucet.component';


@NgModule({
  declarations: [
    ExampleFaucetComponent
  ],
  exports: [
    ExampleFaucetComponent
  ],
  imports: [
    CommonModule,
    W3sFaucetModule
  ]
})
export class ExampleFaucetModule {
}
