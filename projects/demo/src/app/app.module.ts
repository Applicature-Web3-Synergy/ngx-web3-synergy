import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AvatarModule,
  AlertModule,
  ButtonModule,
  InputModule,
  WalletConnectModule,
  WalletConnectService,
  DialogModule
} from '@applicature/components';
import { WalletInitOptions, WalletModule } from 'bnc-onboard/dist/src/interfaces';

import { AppComponent } from './app.component';
import { DialogTestComponent } from './components/dialog-test/dialog-test.component';

const wallets: Array<WalletModule | WalletInitOptions> = [
  {
    walletName: 'metamask',
    preferred: true
  },
  {
    walletName: 'walletConnect',
    infuraKey: 'INFURA_KEY',
    preferred: true
  }
];

const networks = {
  kovanTestnet: 42
};

export function initWalletServiceFactory(
  walletConnectService: WalletConnectService
): () => Promise<void> {
  return () => walletConnectService.initialize({
    networkId: networks.kovanTestnet,
    walletSelect: { wallets }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    DialogTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AlertModule,
    AvatarModule,
    ButtonModule,
    InputModule,
    DialogModule,
    WalletConnectModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initWalletServiceFactory,
      deps: [WalletConnectService],
      multi: true
    }
  ],
  entryComponents: [
    DialogTestComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
