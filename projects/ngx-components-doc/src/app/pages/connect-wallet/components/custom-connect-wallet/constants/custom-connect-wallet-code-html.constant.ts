export const CustomConnectWalletCodeHtml =
`<div class="doc-grid-container">
  <div class="doc-grid-item">
    <div class="doc-list-wallets">
      <button type="button"
              class="doc-custom-btn"
              (click)="connect('MetaMask')"
      >
        {{connectedWalletLabel === 'MetaMask' ? 'Disconnect' : 'Connect'}} Metamask
      </button>

      <button type="button"
              class="doc-custom-btn"
              (click)="connect('WalletConnect')"
      >
        {{connectedWalletLabel === 'WalletConnect' ? 'Disconnect' : 'Connect'}} WalletConnect
      </button>
    </div>
  </div>
</div>
`;
