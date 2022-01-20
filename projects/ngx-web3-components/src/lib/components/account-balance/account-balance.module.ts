import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes';

import { AccountBalanceComponent } from './account-balance.component';

@NgModule({
  declarations: [
    AccountBalanceComponent
  ],
  exports: [
    AccountBalanceComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
  ],
})
export class AccountBalanceModule {
}
