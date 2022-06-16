import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { AucWalletConnectService } from './services';
import { AucConnectModalComponent } from './components/';
import { AucDialogModule } from '../dialog';
import { AucBlockScrollHelperService } from '../helpers';


@NgModule({
  imports: [
    AucDialogModule
  ],
  declarations: [
    AucConnectModalComponent
  ],
  providers: [
    AucBlockScrollHelperService
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
        AucWalletConnectService
      ]
    };
  }
}
