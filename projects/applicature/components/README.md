# Applicature Univarsal Components
This library can help you to develop Blockchain projects easily.
<br>
This library supports an Angular 13 version.

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
            ],
            "@angular/*": [
              "./node_modules/@angular/*"
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
  
 - Other: `tsconfig.app.json`
    <pre><code>
    {
      ...,
      compilerOptions: {
      path: {
        ...,
        "@angular/*": [
          "./node_modules/@angular/*"
        ]
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
    infuraKey: 'INFURA_KEY',
    preferred: true,
  },
];

const networks = {
  kovanTestnet: 42,
}

export function initWalletServiceFactory(
  walletConnectService: WalletConnectService
): () => Observable<void> {
  return () => walletConnectService.initialize({
    networkId: networks.kovanTestnet,
    walletSelect: { wallets }
  });
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
