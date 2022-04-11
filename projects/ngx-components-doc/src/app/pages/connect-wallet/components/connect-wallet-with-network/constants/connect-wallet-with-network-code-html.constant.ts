export const ConnectWalletWithNetworkCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <auc-connect-wallet [showNetworkOptions]="true"
                        (onConnect)="onConnect($event)"
                        (onDisconnect)="onDisconnect()"
    >
    </auc-connect-wallet>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">As Icon</h5>

    <auc-connect-wallet [appearance]="WALLET_APPEARANCE.ICON"
                        [showNetworkOptions]="true"
                        (onConnect)="onConnect($event)"
                        (onDisconnect)="onDisconnect()"
    >
    </auc-connect-wallet>
  </div>
</div>
`;
