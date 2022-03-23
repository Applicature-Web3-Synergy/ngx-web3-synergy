import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAccountBalanceModule } from '../renamed/account-balance';
import { AucAccountButtonModule } from '../renamed/account-button';
import { AucButtonModule } from '../renamed/button';
import { AucNetworkDropdownModule } from '../renamed/network-dropdown';
import { AucPipesModule } from '../renamed/pipes';
import { AucTransactionsHistoryModule } from '../renamed/transactions-history';
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
    AucAccountButtonModule,
    AucAccountBalanceModule,
    AucTransactionsHistoryModule,
    AucDialogModule
  ],
})
export class ConnectWalletModule {
}
