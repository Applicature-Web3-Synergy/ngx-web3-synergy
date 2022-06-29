import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleAccountBalanceComponent } from './example-account-balance.component';
import { AucAccountBalanceModule } from '@applicature/components';



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
