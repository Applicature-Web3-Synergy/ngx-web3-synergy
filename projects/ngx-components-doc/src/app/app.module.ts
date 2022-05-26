import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import {
  AUC_CHAIN_ID,
  AucBlockExplorerUrls,
  AucConnectModule,
  AucNativeCurrencies,
  AucWalletConnectService,
  AucRpcUrls
} from '@applicature/components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { AppInitializerService } from './app-initializer/app-initializer.service';
import { FooterComponent } from './components/footer/footer.component';
import { environment } from '../../../demo/src/environments/environment';

/** Read more about Infura https://infura.io */
const INFURA_KEY = environment.infuraKey;

/** More info https://docs.blocknative.com/onboard/injected-wallets */
const injected = injectedModule();

/** More info https://docs.blocknative.com/onboard/wallet-connect */
const walletConnect = walletConnectModule({
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  }
});

/** More supported wallets https://docs.blocknative.com/onboard */

export function initWalletServiceFactory(
  walletConnectService: AucWalletConnectService
): () => Observable<void> {
  return () => walletConnectService.initialize({
    wallets: [ injected, walletConnect ],
    chains: [
      {
        id: AUC_CHAIN_ID.BSC_TESTNET,
        token: 'BNB',
        label: 'BNB Chain',
        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
        icon: 'assets/svg/network/bsc.svg',
        blockExplorerUrl: 'https://testnet.bscscan.com',
        blockExplorerApiUrl: 'https://api-testnet.bscscan.com/api',
      },
      {
        id: AUC_CHAIN_ID.POLYGON_TESTNET,
        token: AucNativeCurrencies[AUC_CHAIN_ID.POLYGON_TESTNET].name,
        label: 'Matic Mainnet',
        rpcUrl: AucRpcUrls[AUC_CHAIN_ID.POLYGON_TESTNET][0],
        icon: 'assets/svg/network/polygon.svg',
        blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.POLYGON_TESTNET][0],
      },
      {
        id: AUC_CHAIN_ID.RINKEBY_TESTNET,
        token: 'ETH',
        label: 'Rinkeby Ethereum',
        rpcUrl: AucRpcUrls[AUC_CHAIN_ID.RINKEBY_TESTNET][0] + '/' + INFURA_KEY,
        icon: 'assets/svg/network/eth.svg',
        blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.RINKEBY_TESTNET][0],
      }
    ],
    appMetadata: {
      name: "Ngx Universal Components",
      icon: "assets/img/connection/connection-icon.png",
      logo: "assets/img/connection/connection-logo.svg",
      description: "Ngx Universal Components documentation.",
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' }
      ]
    }
  });
}


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    AucConnectModule.forRoot(),
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializerService.factory,
      deps: [AppInitializerService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initWalletServiceFactory,
      deps: [ AucWalletConnectService ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
