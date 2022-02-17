## Components

`npm i @applicature/styles @applicature/components`

- styles.scss

<pre><code>@import "~node_modules/@applicature/styles/src/lib/scss/styles";</code></pre>

- polyfills.ts

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
  walletConnectService: WalletConnectService,
): () => Promise<void> {
  return () => walletConnectService.initialize({
    networkId: networks.kovanTestnet,
    walletSelect: { wallets },
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

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default. This is no longer the case
for Angular 13+. Verify if you need this module and configure a polyfill for it.

`npm i -D crypto-browserify stream-browserify assert stream-http https-browserify os-browserify`

- tsconfig.app.json

<pre>
<code>
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
</code></pre>
