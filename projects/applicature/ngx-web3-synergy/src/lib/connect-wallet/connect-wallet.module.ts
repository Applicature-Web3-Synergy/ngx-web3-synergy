import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sAccountBalanceModule } from '../account-balance';
import { W3sAccountButtonModule } from '../account-button';
import { W3sButtonModule } from '../button';
import { W3sNetworkDropdownModule } from '../network-dropdown';
import { W3sPipesModule } from '../pipes';
import { W3sConnectWalletComponent } from './connect-wallet.component';
import { W3sDialogModule } from '../dialog';
import { W3sTransactionsModule } from '../transactions';

@NgModule({
  declarations: [
    W3sConnectWalletComponent
  ],
  exports: [
    W3sConnectWalletComponent
  ],
  imports: [
    CommonModule,
    W3sButtonModule,
    W3sPipesModule,
    W3sNetworkDropdownModule,
    W3sAccountButtonModule,
    W3sAccountBalanceModule,
    W3sDialogModule,
    W3sTransactionsModule
  ],
})
export class W3sConnectWalletModule {
}
