export const ConnectWalletAsIconCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <auc-connect-wallet [appearance]="WALLET_APPEARANCE.ICON"
                        (onConnect)="onConnect($event)"
                        (onDisconnect)="onDisconnect()"
    >
    </auc-connect-wallet>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With Balance</h5>

    <auc-connect-wallet [appearance]="WALLET_APPEARANCE.ICON"
                        [showBalance]="true"
                        (onConnect)="onConnect($event)"
                        (onDisconnect)="onDisconnect()"
    >
    </auc-connect-wallet>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With transactions</h5>

    <auc-connect-wallet [appearance]="WALLET_APPEARANCE.ICON"
                        [showTransactions]="true"
                        (onConnect)="onConnect($event)"
                        (onDisconnect)="onDisconnect()"
    >
    </auc-connect-wallet>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With Menu Options</h5>

    <auc-connect-wallet [appearance]="WALLET_APPEARANCE.ICON"
                        [accountOptions]="accountOptions"
                        (onConnect)="onConnect($event)"
                        (onDisconnect)="onDisconnect()"
                        (optionClicked)="onOptionClicked($event)"
    >
    </auc-connect-wallet>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Customize dropdown</h5>

    <auc-connect-wallet [appearance]="WALLET_APPEARANCE.ICON"
                        [account]="{ name: 'Account Name', image: 'assets/img/ex-avatar.png'}"
                        [accountDropdownConfig]="accountDropdownConfig"
                        (onConnect)="onConnect($event)"
                        (onDisconnect)="onDisconnect()"
    >
    </auc-connect-wallet>
  </div>
</div>
`;
