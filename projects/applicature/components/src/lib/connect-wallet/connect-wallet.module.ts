import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountBalanceModule } from '../account-balance/account-balance.module';
import { AccountButtonModule } from '../account-button/account-button.module';
import { AucButtonModule } from '../renamed/button';
import { NetworkDropdownModule } from '../network-dropdown';
import { PipesModule } from '../pipes';
import { TransactionsHistoryModule } from '../transactions-history/transactions-history.module';
import { ConnectWalletComponent } from './connect-wallet.component';
import { AucDialogModule } from '../renamed/dialog';

@NgModule({
  declarations: [
    ConnectWalletComponent,
  ],
  exports: [
    ConnectWalletComponent,
  ],
  imports: [
    CommonModule,
    AucButtonModule,
    PipesModule,
    NetworkDropdownModule,
    AccountButtonModule,
    AccountBalanceModule,
    TransactionsHistoryModule,
    AucDialogModule
  ],
})
export class ConnectWalletModule {
}
