import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucFaucetModule } from '@applicature/components';

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
    AucFaucetModule
  ]
})
export class ExampleFaucetModule {
}
