import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucAccountBalanceModule } from '../account-balance';
import { AucAccountButtonModule } from '../account-button';
import { AucButtonModule } from '../button';
import { AucNetworkDropdownModule } from '../network-dropdown';
import { AucPipesModule } from '../pipes';
import { AucConnectWalletComponent } from './connect-wallet.component';
import { AucDialogModule } from '../dialog';
import { AucTransactionsModule } from '../transactions';

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
    AucDialogModule,
    AucTransactionsModule
  ],
})
export class AucConnectWalletModule {
}
