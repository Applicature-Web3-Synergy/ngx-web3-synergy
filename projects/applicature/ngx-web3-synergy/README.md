# Web3 Synergy
This library was created and maintained by [**Applicature**](https://applicature.com/) to help create a front-end on any blockchain projects for ourselves, our partners or any blockchain developer.
This library supports Angular from version 13 and higher.

## Documentation
For more information visit the [**documentation**](https://docs.web3synergy.net).

## Library installation
    npm i @applicature/styles @applicature/ngx-web3-synergy

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
import { Buffer } from 'buffer';
import process from 'process';

import { WindowEth } from '@applicature/ngx-web3-synergy';

declare global {
  interface Window extends WindowEth {}
}

window.process = process;
window.global = window;
window.global.Buffer = global.Buffer || Buffer;
</code></pre>
  - Install <strong>process</strong> if it needs `npm i process`

  
### Fixing Build errors
- add next option to **tsconfig.json**:

<pre><code>{
  ...,
  "compilerOptions": {
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    ...
  }
}</code></pre>

> BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default. This is no longer the case
for Angular 13+. Verify if you need this module and configure a polyfill for it.

Solution:
   - `npm i -D crypto-browserify stream-browserify assert stream-http https-browserify os-browserify buffer process util url`
   - **tsconfig.json**

      <pre><code>
      {
        ...,
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
             ],
             "url": [
                "./node_modules/url"
              ]
          }
        }
      }
      </code></pre>

   - or add the next to the **package.json**

     <pre><code>
     {
        ...,
        "browser": {
          "crypto": false,
          "stream": false,
          "assert": false,
          "http": false,
          "https": false,
          "os": false,
          "path": false,
          "buffer": false,
          "process": false,
          "util": false,
          "url": false
        }
     }
     </code></pre>


## How to use
 This Library uses **@web3-onboard/core** for the connection wallet. So you can visit their [documentation](https://docs.blocknative.com/onboard/core) for more details.
 
 - **app.module.ts**

<pre><code>
import injectedModule from '@web3-onboard/injected-wallets'

/** Read more about Infura https://infura.io */
const INFURA_KEY = environment.infuraKey;

/** More info https://docs.blocknative.com/onboard/injected-wallets */
const injected = injectedModule();

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
  ...
  imports: [
    ...
    W3sConnectModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initWalletServiceFactory,
      deps: [ W3sWalletConnectService ],
      multi: true
    }
  ]
})
export class AppModule { }
</code></pre>

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
              "@babel/runtime/helpers/slicedToArray",
              "hash.js",
              "create-hash",
              "copy-to-clipboard",
              "qrcode"
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
You can find Web3 Synergy on [**GitHub**](https://github.com/Applicature-Web3-Synergy/ngx-web3-synergy); feel free to open an issue or create a pull request:

