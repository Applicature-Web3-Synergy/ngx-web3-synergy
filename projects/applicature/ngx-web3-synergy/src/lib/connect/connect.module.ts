import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W3sWalletConnectService } from './services';
import { W3sConnectModalComponent } from './components/';
import { W3sDialogModule } from '../dialog';
import { W3sBlockScrollHelperService, W3sInstallWalletHelperService } from '../helpers';
import { W3sIconModule } from '../icon';


@NgModule({
  imports: [
    CommonModule,
    W3sDialogModule,
    W3sIconModule
  ],
  declarations: [
    W3sConnectModalComponent
  ],
  providers: [
    W3sBlockScrollHelperService,
    W3sInstallWalletHelperService
  ]
})
export class W3sConnectModule {
  constructor(@Optional() @SkipSelf() parentModule: W3sConnectModule) {
    if (parentModule) {
      throw new Error('W3sConnectModule is already loaded. Import it in the AppModule only!');
    }
  }

  public static forRoot(): ModuleWithProviders<W3sConnectModule> {
    return {
      ngModule: W3sConnectModule,
      providers: [
        W3sWalletConnectService
      ]
    };
  }
}
