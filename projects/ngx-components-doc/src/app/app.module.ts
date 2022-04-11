import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { WalletInitOptions, WalletModule } from 'bnc-onboard/dist/src/interfaces';
import {
  AUC_CHAIN_ID,
  AUC_CHAIN_ID_NUM, AucBlockExplorerApiUrl,
  AucBlockExplorerUrls, AucConnectModule, aucGetChainParams,
  AucNativeCurrencies,
  AucNetworkOption, AucWalletConnectService
} from '@applicature/components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { AppInitializerService } from './app-initializer/app-initializer.service';


const wallets: Array<WalletModule | WalletInitOptions> = [
  {
    walletName: 'metamask',
    preferred: true
  },
  {
    walletName: 'walletConnect',
    infuraKey: '${YOUR_INFURA_KEY}',
    preferred: false
  }
];

const networks = {
  eth: 1,
  kovanTestnet: AUC_CHAIN_ID_NUM.KOVAN_TESTNET,
};

const supportedNetworks: AucNetworkOption[] = [
  {
    icon: 'assets/svg/network/eth.svg',
    name: 'Ethereum',
    chainId: AUC_CHAIN_ID.RINKEBY_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.RINKEBY_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.RINKEBY_TESTNET][0],
    isActive: false
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'BSC',
    chainId: '0x61',
    symbol: 'BNB',
    blockExplorerUrl: 'https://testnet.bscscan.com',
    blockExplorerApiUrl: 'https://api-testnet.bscscan.com/api',
    isActive: false,
    chainParams: { // Custom Chain params
      chainId: '0x61',
      chainName: 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18
      },
      rpcUrls: [ 'https://data-seed-prebsc-1-s1.binance.org:8545' ],
      blockExplorerUrls: [ 'https://testnet.bscscan.com' ]
    }
  },
  {
    icon: 'assets/svg/network/avax.svg',
    name: 'Avalanche',
    chainId: AUC_CHAIN_ID.AVALANCH_TESTNET,
    isActive: false,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.AVALANCH_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.AVALANCH_TESTNET][0],
    blockExplorerApiUrl: AucBlockExplorerApiUrl[AUC_CHAIN_ID.AVALANCH_TESTNET],
    chainParams: { // modified existing Chain params
      ...(aucGetChainParams(AUC_CHAIN_ID.AVALANCH_TESTNET)),
      chainName: 'Avalanche TestNet'
    }
  }
];

export function initWalletServiceFactory(
  walletConnectService: AucWalletConnectService
): () => Observable<void> {
  return () => walletConnectService.initialize({
    networkId: networks.eth,
    walletSelect: { wallets }
  }, supportedNetworks);
}


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    AucConnectModule.forRoot()
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
