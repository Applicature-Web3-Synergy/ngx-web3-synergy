# Applicature Univarsal Components
This library can help you to develop Blockchain projects easily.
<br>
For now, this library supports only Angular 13 version. We will add support lower versions int the future

## Instaling library
`npm i @applicature/styles @applicature/components`

## How to make it works

### styles.scss
<pre><code>@import "~node_modules/@applicature/styles/src/lib/scss/styles";</code></pre>
or
<br>
<br>
Add `node_modules/@applicature/styles/src/lib/scss/styles to` to `angular.json` file, path `projects.YOUR_PROJECT_NAME.architect.build.options.styles`:
<pre><code>
{
  ...,
  "projects": {
    ...,
    "YOUR_PROJECT_NAME": {
        ...,
      "architect": {
        "build": {
          ...,
          "options": {
            ...,
            "styles": [
              ...,
              "node_modules/@applicature/styles/src/lib/scss/styles.scss"
            ],
          }
        }
      }
    }
  }
}
</code></pre>

### polyfills.ts

<pre><code>
import { Ethereum } from '@applicature/components';
import { Buffer } from 'buffer';
import process from 'process';  // Included with Angular CLI.
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: Ethereum;
    global: any;
    web3: Web3;
  }
}

window.process = process;
window.global = window;
window.global.Buffer = global.Buffer || Buffer;
</code></pre>

  - Install <strong>process</strong> if it needs `npm i process`
    - add next option to `tsconfig.json`:

      <pre><code>
      {
        ...,
        "compilerOptions": {
          "allowSyntheticDefaultImports": true,
          ...
        }
      }
      </code></pre>


### Fixing Build errors

 - `BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default. This is no longer the case
for Angular 13+. Verify if you need this module and configure a polyfill for it.`
<br>
<br>
Solution:
   - `npm i -D crypto-browserify stream-browserify assert stream-http https-browserify os-browserify`
<br>
<br>
   - tsconfig.app.json

      <pre>
      <code>
      {
        ...,
        compilerOptions: {
          ...,
          "paths": {
            "crypto": [
              "./node_modules/crypto-browserify"
            ],
            "stream": [
              "./node_modules/stream-browserify"
            ],
            "assert": [
              "./node_modules/assert"
            ],
            "http": [
              "./node_modules/stream-http"
            ],
            "https": [
              "./node_modules/https-browserify"
            ],
            "os": [
              "./node_modules/os-browserify"
            ]
          }
        }
      }
      </code></pre>
  
 - `BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.`
    <br>
    <br>
    Solution: `npm i -D crypto-browserify stream-browserify assert stream-http https-browserify os-browserify` or add to the `package.json` next code:<br>
    <pre><code>
    {
      ...,
      "dependencies": {...},
      "devDependencies": {...},
      "browser": {
        "http": false,
        "https": false,
        "os": false,
        "crypto": false,
        "stream": false
      }
    }
    </code></pre>

## How to use
 - app.module.ts

<pre><code>
const wallets: Array<WalletModule | WalletInitOptions> = [
  {
    walletName: 'metamask',
    preferred: true,
  },
  {
    walletName: 'walletConnect',
    infuraKey: `${YOUR_INFURA_KEY}`,
    preferred: true,
  },
];

const networks = {
  kovanTestnet: 42,
}

const supportedNetworks: AucNetworkOption[] = [
  {
    icon: 'assets/svg/network/eth.svg',
    name: 'Ethereum',
    chainId: AUC_CHAIN_ID.RINKEBY_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.RINKEBY_TESTNET].name,
    isActive: false
  },
  {
    icon: 'assets/svg/network/eth.svg',
    name: 'Kovan',
    chainId: AUC_CHAIN_ID.KOVAN_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.KOVAN_TESTNET].name,
    isActive: false
  },
  {
    icon: 'assets/svg/network/bsc.svg',
    name: 'BSC',
    chainId: AUC_CHAIN_ID.BSC_TESTNET,
    symbol: AucNativeCurrencies[AUC_CHAIN_ID.BSC_TESTNET].name,
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
    symbol: 'AVAX',
    chainParams: { // modify existing Chain params
      ...(aucGetChainParams(AUC_CHAIN_ID.AVALANCH_TESTNET)),
      chainName: 'Avalanche TestNet'
    }
  },
];

export function initWalletServiceFactory(
  walletConnectService: WalletConnectService
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
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    WalletConnectModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initWalletServiceFactory,
      deps: [WalletConnectService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
</code>
</pre>

## WARNINGS
You might need to add `allowedCommonJsDependencies` to `angular.json` file:
<pre><code>
{
  ...,
  "projects": {
    ...,
    "YOUR_PROJECT_NAME": {
        ...,
      "architect": {
        "build": {
          ...,
          "options": {
            ...,
            "allowedCommonJsDependencies": [
              "@metamask/jazzicon",
              "web3",
              "tweetnacl",
              "ethereumjs-util",
              "ethereumjs-common",
              "rtcpeerconnection-shim",
              "gridplus-sdk",
              "buffer",
              "sturdy-websocket",
              "walletlink",
              "@walletconnect/web3-provider",
              "trezor-connect",
              "@ensdomains/ensjs",
              "eth-sig-util",
              "ethereumjs-tx",
              "eth-lattice-keyring",
              "@ethereumjs/tx",
              "@ethereumjs/common",
              "@shapeshiftoss/hdwallet-keepkey-webusb",
              "@shapeshiftoss/hdwallet-core",
              "@gnosis.pm/safe-apps-sdk",
              "@gnosis.pm/safe-apps-provider",
              "eth-provider",
              "@cvbb/eth-keyring",
              "authereum",
              "web3-provider-engine/subproviders/subscription",
              "web3-provider-engine/subproviders/nonce-tracker",
              "web3-provider-engine/subproviders/hooked-wallet",
              "web3-provider-engine/subproviders/fixture",
              "web3-provider-engine/subproviders/filters",
              "web3-provider-engine/subproviders/cache",
              "web3-provider-engine",
              "@walletconnect/qrcode-modal",
              "query-string",
              "@walletconnect/environment",
              "@walletconnect/socket-transport",
              "@walletconnect/window-metadata",
              "pump",
              "eth-rpc-errors",
              "@metamask/obs-store",
              "@ledgerhq/devices/lib/hid-framing",
              "@ensdomains/address-encoder",
              "@babel/runtime/helpers/slicedToArray"
            ]
          }
        }
      }
    }
  }
}
</code></pre>
