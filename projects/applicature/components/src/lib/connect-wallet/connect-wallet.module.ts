import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountBalanceModule } from '../account-balance/account-balance.module';
import { AccountButtonModule } from '../account-button/account-button.module';
import { ButtonModule } from '../button/button.module';
import { NetworkDropdownModule } from '../network-dropdown/network-dropdown.module';
import { PipesModule } from '../pipes';
import { TransactionsHistoryModule } from '../transactions-history/transactions-history.module';
import { ConnectWalletComponent } from './connect-wallet.component';

@NgModule({
  declarations: [
    ConnectWalletComponent,
  ],
  exports: [
    ConnectWalletComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    PipesModule,
    NetworkDropdownModule,
    AccountButtonModule,
    AccountBalanceModule,
    TransactionsHistoryModule,
  ],
})
export class ConnectWalletModule {
}
