import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import {
  W3S_CHAIN_ID,
  W3sBlockExplorerUrls, W3sConnectModule,
  W3sNativeCurrencies,
  W3sRpcUrls,
  W3sWalletConnectService
} from '@applicature/ngx-web3-synergy';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {
  CardModule,
  ExampleAccountBalanceModule,
  ExampleAlertsModule,
  ExampleAvatarsModule,
  ExampleButtonsModule,
  ExampleConnectWalletModule,
  ExampleDialogsModule,
  ExampleDropdownMenuModule,
  ExampleFaucetModule,
  ExampleInputsModule,
  ExampleTableModule
} from './modules';

const INFURA_KEY = environment.infuraKey;

const injected = injectedModule();

const walletConnect = walletConnectModule({
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  }
});

export function initWalletServiceFactory(
  walletConnectService: W3sWalletConnectService
): () => Observable<void> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    W3sConnectModule.forRoot(),
    ExampleDialogsModule,
    ExampleTableModule,
    ExampleAccountBalanceModule,
    CardModule,
    ExampleConnectWalletModule,
    ExampleButtonsModule,
    ExampleAvatarsModule,
    ExampleFaucetModule,
    ExampleAlertsModule,
    ExampleDropdownMenuModule,
    ExampleInputsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initWalletServiceFactory,
      deps: [ W3sWalletConnectService ],
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
