import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { AucAccountButtonModule } from './renamed/account-button';
import { AucConnectWalletModule } from './renamed/connect-wallet';
import { ModalsModule } from './renamed/modals';
import { AucNetworkDropdownModule } from './renamed/network-dropdown';
import { TransactionService } from './services/transaction.service';
import { WalletConnectService } from './services';
import { AucTransactionsHistoryModule } from './renamed/transactions-history';


const modules = [
  AucConnectWalletModule,
  AucNetworkDropdownModule,
  AucAccountButtonModule,
  AucTransactionsHistoryModule,
  ModalsModule,
];

@NgModule({
  imports: [
    ...modules,
  ],
  exports: [
    ...modules,
  ],
})
export class WalletConnectModule {
  constructor(@Optional() @SkipSelf() parentModule: WalletConnectModule) {
    if (parentModule) {
      throw new Error('WalletConnectModule is already loaded. Import it in the AppModule only!');
    }
  }

  public static forRoot(): ModuleWithProviders<WalletConnectModule> {
    return {
      ngModule: WalletConnectModule,
      providers: [
        TransactionService,
        WalletConnectService
      ]
    };
  }
}
