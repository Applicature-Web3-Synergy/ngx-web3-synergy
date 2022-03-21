import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { AuxAccountButtonModule } from './renamed/account-button';
import { ConnectWalletModule } from './connect-wallet/connect-wallet.module';
import { ModalsModule } from './renamed/modals';
import { AucNetworkDropdownModule } from './renamed/network-dropdown';
import { TransactionService } from './services/transaction.service';
import { WalletConnectService } from './services';
import { TransactionsHistoryModule } from './transactions-history/transactions-history.module';


const modules = [
  ConnectWalletModule,
  AucNetworkDropdownModule,
  AuxAccountButtonModule,
  TransactionsHistoryModule,
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
