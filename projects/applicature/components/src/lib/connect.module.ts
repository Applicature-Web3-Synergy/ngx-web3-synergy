import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AucTransactionService, AucWalletConnectService } from './services';


@NgModule({
  imports: [
    HttpClientModule
  ]
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
        AucWalletConnectService,
        AucTransactionService
      ]
    };
  }
}
