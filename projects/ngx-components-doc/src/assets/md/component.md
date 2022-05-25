# Applicature Universal Components
This library was created and maintained by Applicature to help create a front-end on any blockchain projects for ourselves, our partners or any blockchain developer.
This library supports only Angular 13 version.

## Documetation
Coming soon.

## Library installation
    npm i @applicature/styles @applicature/components

## How to make it works

### styles.scss
     @import "~node_modules/@applicature/styles/src/lib/scss/as-styles";

or

Add `node_modules/@applicature/styles/src/lib/scss/as-styles` to **angular.json** file, path **projects.YOUR_PROJECT_NAME.architect.build.options.styles**:

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
              "node_modules/@applicature/styles/src/lib/scss/as-styles.scss"
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
import { AucEthereum } from '@applicature/components';
import { Buffer } from 'buffer';
import process from 'process';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: AucEthereum;
    global: any;
    web3: Web3;
  }
}

window.process = process;
window.global = window;
window.global.Buffer = global.Buffer || Buffer;
</code></pre>
  - Install <strong>process</strong> if it needs `npm i process`
    - add next option to **tsconfig.json**:

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

> BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default. This is no longer the case
for Angular 13+. Verify if you need this module and configure a polyfill for it.

Solution:
   - `npm i -D crypto-browserify stream-browserify assert stream-http https-browserify os-browserify buffer process util`
   - **tsconfig.app.json**

      <pre><code>
      {
        ...,
        "skipLibCheck": true,
        "resolveJsonModule": true,
        "compilerOptions": {
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
              "./node_modules/os-browserify/browser"
            ],
            "path": [
              "./node_modules/path-browserify"
            ],
            "buffer": [
               "./node_modules/buffer"
             ],
             "process": [
               "./node_modules/process/browser"
             ],
             "util": [
               "./node_modules/util"
             ]
          }
        }
      }
      </code></pre>

## How to use
 - **app.module.ts**

<pre><code>
import injectedModule from '@web3-onboard/injected-wallets'

/** Read more about Infura https://infura.io */
const INFURA_KEY = environment.infuraKey;

/** More info https://docs.blocknative.com/onboard/injected-wallets */
const injected = injectedModule();

/** More supported wallets https://docs.blocknative.com/onboard  */

export function initWalletServiceFactory(
  walletConnectService: AucWalletConnectService
): () => Observable<void> {
  return () => walletConnectService.initialize({
    wallets: [ injected ],
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
        rpcUrl: `${AucRpcUrls[AUC_CHAIN_ID.RINKEBY_TESTNET][0]}/${INFURA_KEY}`,
        icon: 'assets/svg/network/eth.svg',
        blockExplorerUrl: AucBlockExplorerUrls[AUC_CHAIN_ID.RINKEBY_TESTNET][0],
      }
    ],
    appMetadata: {
      name: "Ngx Universal Components",
      icon: `${ICON_PATH}`,
      logo: `${LOGO_PATH}`,
      description: "Some Description",
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' }
      ]
    }
  });
}


@NgModule({
  ...
  imports: [
    ...
    AucConnectModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initWalletServiceFactory,
      deps: [ AucWalletConnectService ],
      multi: true
    }
  ]
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

## Contributing
This project is maintained by a community of developers. Contributions are welcome and appreciated.
You can find Applicature Universal Component on GitHub; feel free to open an issue or create a pull request:
The link coming soon.
