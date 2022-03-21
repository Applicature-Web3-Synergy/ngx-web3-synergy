import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountBalanceModule } from '../account-balance/account-balance.module';
import { AuxAccountButtonModule } from '../renamed/account-button';
import { AucButtonModule } from '../renamed/button';
import { AucNetworkDropdownModule } from '../renamed/network-dropdown';
import { AucPipesModule } from '../renamed/pipes';
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
    AucPipesModule,
    AucNetworkDropdownModule,
    AuxAccountButtonModule,
    AccountBalanceModule,
    TransactionsHistoryModule,
    AucDialogModule
  ],
})
export class ConnectWalletModule {
}
