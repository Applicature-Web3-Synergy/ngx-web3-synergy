export const BasicTransactionHistoryCodeHtml =
`<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <auc-transactions-history></auc-transactions-history>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Disabled</h5>

    <auc-transactions-history [disabled]="true"></auc-transactions-history>
  </div>

  <div class="doc-actions full-width" *ngIf="currentChainId">
    <auc-button label="Add Success Transaction" (buttonClicked)="addTransaction()"></auc-button>
    <auc-button label="Add Pending Transaction" (buttonClicked)="addTransaction(TRANSACTION_STATUS.PENDING)"></auc-button>
    <auc-button label="Add Fail Transaction" (buttonClicked)="addTransaction(TRANSACTION_STATUS.FAIL)"></auc-button>
    <auc-button label="Clear Transactions" (buttonClicked)="clearTransactions()"></auc-button>
  </div>
</div>
`;
