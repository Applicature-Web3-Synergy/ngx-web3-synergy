import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import { WalletInitOptions, WalletModule } from 'bnc-onboard/dist/src/interfaces';
import {
  AucAlertModule,
  AucDropdownMenuModule,
  AucAvatarModule,
  AucButtonModule,
  AucInputModule,
  AucConnectModule,
  AucWalletConnectService,
  AucNetworkOption,
  AUC_CHAIN_ID,
  aucGetChainParams,
  AucBlockExplorerUrls,
  AucConnectWalletModule,
  AucNativeCurrencies
} from '@applicature/components';

import { AppComponent } from './app.component';
import { ExampleDialogsModule } from './examples/example-dialogs/example-dialogs.module';
import { ExampleTableModule } from './examples/example-table/example-table.module';
import { ExampleDropdownMenuModule } from './examples/example-dropdown-menu/example-dropdown-menu.module';
import { ExampleAccountBalanceModule } from './examples/example-account-balance/example-account-balance.module';

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
    chainId: AUC_CHAIN_ID.BSC_TESTNET,
    symbol: 'BNB',
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.BSC_TESTNET][0],
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
    chainParams: { // modify existing Chain params
      ...(aucGetChainParams(AUC_CHAIN_ID.AVALANCH_TESTNET)),
      chainName: 'Avalanche TestNet'
    }
  }
];

export function initWalletServiceFactory(
  walletConnectService: AucWalletConnectService
): () => Observable<void> {
  return () => walletConnectService.initialize({
    networkId: networks.kovanTestnet,
    walletSelect: { wallets }
  }, supportedNetworks);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AucAlertModule,
    AucAvatarModule,
    AucButtonModule,
    AucInputModule,
    AucConnectModule.forRoot(),
    ExampleDialogsModule,
    ExampleTableModule,
    AucDropdownMenuModule,
    ExampleDropdownMenuModule,
    ExampleAccountBalanceModule,
    AucConnectWalletModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initWalletServiceFactory,
      deps: [ AucWalletConnectService ],
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
