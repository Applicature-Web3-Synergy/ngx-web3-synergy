import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AucWalletConnectService } from './services';
import { AucConnectModalComponent } from './components/';
import { AucDialogModule } from '../dialog';
import { AucBlockScrollHelperService, AucInstallWalletHelperService } from '../helpers';
import { AucIconModule } from '../icon';


@NgModule({
  imports: [
    CommonModule,
    AucDialogModule,
    AucIconModule
  ],
  declarations: [
    AucConnectModalComponent
  ],
  providers: [
    AucBlockScrollHelperService,
    AucInstallWalletHelperService
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
