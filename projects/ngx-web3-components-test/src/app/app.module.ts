import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { WalletInitOptions, WalletModule } from 'bnc-onboard/dist/src/interfaces';
import { WalletService, NgxWeb3ComponentsModule } from 'ngx-web3-components';

import { AppComponent } from './app.component';

const wallets: Array<WalletModule | WalletInitOptions> = [
  {
    walletName: 'metamask',
    preferred: true,
  },
  {
    walletName: 'walletConnect',
    infuraKey: 'INFURA_KEY',
    preferred: true,
  },
];

const networks = {
  mainnet: 1,
  ropstenTestnet: 3,
  rinkebyTestnet: 4,
  goerliTestnet: 5,
  kovanTestnet: 42,
  bsc: 56,
  bscTestnet: 97,
  xdai: 100,
}

export function initWalletServiceFactory(
  walletService: WalletService,
): () => Promise<void> {
  return () => walletService.init({
    networkId: networks.mainnet,
    walletSelect: { wallets },
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
    NgxWeb3ComponentsModule.forRoot(),
    RouterModule,
    CommonModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initWalletServiceFactory,
      deps: [WalletService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
