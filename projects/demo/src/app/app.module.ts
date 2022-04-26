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
  AUC_CHAIN_ID_NUM,
  aucGetChainParams,
  AucBlockExplorerUrls,
  AucConnectWalletModule,
  AucNativeCurrencies,
  AucBlockExplorerApiUrl,
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
    infuraKey: '${YOUR_INFURA_KEY}',
    preferred: true
  }
];

const networks = {
  eth: 1,
  kovanTestnet: AUC_CHAIN_ID_NUM.KOVAN_TESTNET,
  // ...
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
    icon: 'assets/svg/network/eth.svg',
    name: 'Kovan',
    chainId: AUC_CHAIN_ID.KOVAN_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.KOVAN_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.KOVAN_TESTNET][0],
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
    chainParams: { // modify existing Chain params
      ...(aucGetChainParams(AUC_CHAIN_ID.AVALANCH_TESTNET)),
      chainName: 'Avalanche TestNet'
    }
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'Arbitrum',
    chainId: AUC_CHAIN_ID.ARBITRUM_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.ARBITRUM_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.ARBITRUM_TESTNET][0],
    isActive: false,
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'Astar',
    chainId: AUC_CHAIN_ID.ASTAR_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.ASTAR_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.ASTAR_TESTNET][0],
    isActive: false,
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'Fantom',
    chainId: AUC_CHAIN_ID.FANTOM_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.FANTOM_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.FANTOM_TESTNET][0],
    isActive: false,
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'Goreli',
    chainId: AUC_CHAIN_ID.GOERLI_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.GOERLI_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.GOERLI_TESTNET][0],
    isActive: false,
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'Optimistic',
    chainId: AUC_CHAIN_ID.OPTIMISTIC_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.OPTIMISTIC_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.OPTIMISTIC_TESTNET][0],
    isActive: false,
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'Polygon',
    chainId: AUC_CHAIN_ID.POLYGON_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.POLYGON_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.POLYGON_TESTNET][0],
    isActive: false,
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'Ropsten',
    chainId: AUC_CHAIN_ID.ROPSTEN_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.ROPSTEN_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.ROPSTEN_TESTNET][0],
    isActive: false,
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'Shiden',
    chainId: AUC_CHAIN_ID.SHIDEN_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.SHIDEN_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.SHIDEN_TESTNET][0],
    isActive: false,
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'Theta',
    chainId: AUC_CHAIN_ID.THETA_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.THETA_TESTNET].name,
    blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.THETA_TESTNET][0],
    isActive: false,
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
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
