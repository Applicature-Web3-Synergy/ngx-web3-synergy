import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucPipesModule } from '../renamed/pipes';
import { AccountBalanceComponent } from './account-balance.component';


@NgModule({
  declarations: [
    AccountBalanceComponent,
  ],
  exports: [
    AccountBalanceComponent,
  ],
  imports: [
    CommonModule,
    AucPipesModule,
  ]
})
export class AccountBalanceModule {
}
