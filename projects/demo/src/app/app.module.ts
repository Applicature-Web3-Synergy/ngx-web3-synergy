import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';

import {
  AucAlertModule,
  AucDropdownMenuModule,
  AucAvatarModule,
  AucButtonModule,
  AucInputModule,
  AucConnectModule,
  AucWalletConnectService,
  AUC_CHAIN_ID,
  AucBlockExplorerUrls,
  AucConnectWalletModule,
  AucNativeCurrencies,
} from '@applicature/components';

import { AppComponent } from './app.component';
import { ExampleDialogsModule } from './examples/example-dialogs/example-dialogs.module';
import { ExampleTableModule } from './examples/example-table/example-table.module';
import { ExampleDropdownMenuModule } from './examples/example-dropdown-menu/example-dropdown-menu.module';
import { ExampleAccountBalanceModule } from './examples/example-account-balance/example-account-balance.module';
import { AucRpcUrls } from '../../../applicature/components/src/lib/constants';
import { environment } from '../environments/environment';

const INFURA_KEY = environment.infuraKey;

const injected = injectedModule();

const walletConnect = walletConnectModule({
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  }
});

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
        id: AUC_CHAIN_ID.POLYGON_MAINNET,
        token: AucNativeCurrencies[AUC_CHAIN_ID.POLYGON_MAINNET].name,
        label: 'Matic Mainnet',
        rpcUrl: AucRpcUrls[AUC_CHAIN_ID.POLYGON_MAINNET][0],
        icon: 'assets/svg/network/polygon.svg',
        blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.POLYGON_MAINNET][0],
      },
      {
        id: AUC_CHAIN_ID.RINKEBY_TESTNET,
        token: 'ETH',
        label: 'Rinkeby Ethereum',
        rpcUrl: `${AucRpcUrls[AUC_CHAIN_ID.RINKEBY_TESTNET][0]}/${INFURA_KEY}`,
        icon: 'assets/svg/network/eth.svg',
        blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.RINKEBY_TESTNET][0],
      }
    ]
  });
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
