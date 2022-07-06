import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAccountBalanceModule } from '@applicature/ngx-web3-synergy';

import { ExampleAccountBalanceComponent } from './example-account-balance.component';



@NgModule({
  declarations: [
    ExampleAccountBalanceComponent
  ],
  exports: [
    ExampleAccountBalanceComponent
  ],
  imports: [
    CommonModule,
    AucAccountBalanceModule
  ]
})
export class ExampleAccountBalanceModule { }
