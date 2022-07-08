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
  W3S_CHAIN_ID,
  W3sBlockExplorerUrls,
  W3sConnectModule,
  W3sNativeCurrencies,
  W3sWalletConnectService,
  W3sRpcUrls
} from '@applicature/ngx-web3-synergy';

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
  walletConnectService: W3sWalletConnectService
): () => Observable<void> {
  return () => walletConnectService.initialize({
    wallets: [
      /** Shows always Metamask wallet. Doesn't matter is Metamask installed. */
      {
        label: 'MetaMask',
        module: injected,
      },
      /** Will show all installed injected wallets */
      {
        label: 'injected',
        module: injected,
      },
      {
        label: 'WalletConnect',
        module: walletConnect
      }
    ],
    chains: [
      {
        id: W3S_CHAIN_ID.BSC_TESTNET,
        token: 'BNB',
        label: 'BNB Chain',
        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
        icon: 'assets/svg/network/bsc.svg',
        blockExplorerUrl: 'https://testnet.bscscan.com',
        blockExplorerApiUrl: 'https://api-testnet.bscscan.com/api',
      },
      {
        id: W3S_CHAIN_ID.POLYGON_TESTNET,
        token: W3sNativeCurrencies[W3S_CHAIN_ID.POLYGON_TESTNET].name,
        label: 'Matic',
        rpcUrl: W3sRpcUrls[W3S_CHAIN_ID.POLYGON_TESTNET][0],
        icon: 'assets/svg/network/polygon.svg',
        blockExplorerUrl: W3sBlockExplorerUrls[W3S_CHAIN_ID.POLYGON_TESTNET][0],
      },
      {
        id: W3S_CHAIN_ID.RINKEBY_TESTNET,
        token: 'ETH',
        label: 'Rinkeby Ethereum',
        rpcUrl: `${W3sRpcUrls[W3S_CHAIN_ID.RINKEBY_TESTNET][0]}/${INFURA_KEY}`,
        icon: 'assets/svg/network/eth.svg',
        blockExplorerUrl: W3sBlockExplorerUrls[W3S_CHAIN_ID.RINKEBY_TESTNET][0],
      },
    ],
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
    W3sConnectModule.forRoot(),
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
      deps: [ W3sWalletConnectService ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
