import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAccountBalanceModule } from '../account-balance';
import { AucAccountButtonModule } from '../account-button';
import { AucButtonModule } from '../button';
import { AucNetworkDropdownModule } from '../network-dropdown';
import { AucPipesModule } from '../pipes';
import { AucTransactionsHistoryModule } from '../transactions-history';
import { AucConnectWalletComponent } from './connect-wallet.component';
import { AucDialogModule } from '../dialog';

@NgModule({
  declarations: [
    AucConnectWalletComponent
  ],
  exports: [
    AucConnectWalletComponent
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
export class AucConnectWalletModule {
}
