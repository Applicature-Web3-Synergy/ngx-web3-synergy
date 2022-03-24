import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { AucAccountButtonModule } from './account-button';
import { AucConnectWalletModule } from './connect-wallet';
import { ModalsModule } from './modals';
import { AucNetworkDropdownModule } from './network-dropdown';
import { AucWalletConnectService, AucTransactionService } from './services';
import { AucTransactionsHistoryModule } from './transactions-history';


const modules = [
  AucConnectWalletModule,
  AucNetworkDropdownModule,
  AucAccountButtonModule,
  AucTransactionsHistoryModule,
  ModalsModule
];

@NgModule({
  imports: [
    ...modules,
  ],
  exports: [
    ...modules,
  ],
})
export class AucConnectModule {
  constructor(@Optional() @SkipSelf() parentModule: AucConnectModule) {
    if (parentModule) {
      throw new Error('AucConnectModule is already loaded. Import it in the AppModule only!');
    }
  }

  public static forRoot(): ModuleWithProviders<AucConnectModule> {
    return {
      ngModule: AucConnectModule,
      providers: [
        AucTransactionService,
        AucWalletConnectService
      ]
    };
  }
}
