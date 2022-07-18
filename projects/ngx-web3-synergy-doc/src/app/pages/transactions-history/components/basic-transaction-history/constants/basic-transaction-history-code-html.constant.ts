export const BasicTransactionHistoryCodeHtml =
`<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <w3s-transactions-history></w3s-transactions-history>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Disabled</h5>

    <w3s-transactions-history [disabled]="true"></w3s-transactions-history>
  </div>

  <div class="doc-actions full-width" *ngIf="currentChainId">
    <w3s-button label="Add Success Transaction" (buttonClicked)="addTransaction()"></w3s-button>
    <w3s-button label="Add Pending Transaction" (buttonClicked)="addTransaction(TRANSACTION_STATUS.PENDING)"></w3s-button>
    <w3s-button label="Add Fail Transaction" (buttonClicked)="addTransaction(TRANSACTION_STATUS.FAIL)"></w3s-button>
    <w3s-button label="Clear Transactions" (buttonClicked)="clearTransactions()"></w3s-button>
    <mat-checkbox [(ngModel)]="includesAdditionalLinks">Includes Additional links</mat-checkbox>
  </div>
</div>
`;
