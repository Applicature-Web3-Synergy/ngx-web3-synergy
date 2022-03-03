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
  WalletConnectService
} from '@applicature/components';
import { WalletInitOptions, WalletModule } from 'bnc-onboard/dist/src/interfaces';

import { AppComponent } from './app.component';
import { ExampleDialogsModule } from './examples/example-dialogs/example-dialogs.module';
import { ExampleTableModule } from './examples/example-table/example-table.module';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AlertModule,
    AvatarModule,
    ButtonModule,
    InputModule,
    WalletConnectModule.forRoot(),
    ExampleDialogsModule,
    ExampleTableModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initWalletServiceFactory,
      deps: [WalletConnectService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
