export const AppModuleComponentsConnectionCodeConstant = `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';

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

/** More supported wallets https://docs.blocknative.com/onboard  */

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
    ]
  });
}


@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    AucConnectModule.forRoot(),
  ],
  providers: [
    ...
    {
      provide: APP_INITIALIZER,
      useFactory: initWalletServiceFactory,
      deps: [ AucWalletConnectService ],
      multi: true
    }
  ],
  bootstrap: [...]
})
export class AppModule { }
`;
