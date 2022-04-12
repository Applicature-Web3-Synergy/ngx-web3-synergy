export const BasicAccountBalanceCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <auc-account-balance></auc-account-balance>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With currency</h5>

    <auc-account-balance
      [isCurrency]="true"
    >
    </auc-account-balance>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Colored</h5>

    <auc-account-balance
      [isCurrency]="true"
      [color]="COLORS.BLUE"
    >
    </auc-account-balance>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Transparent</h5>

    <auc-account-balance
      [isCurrency]="true"
      [appearance]="BALANCE_APPEARANCE.TRANSPARENT"
    >

    </auc-account-balance>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Translucent</h5>

    <auc-account-balance
      [isCurrency]="true"
      [appearance]="BALANCE_APPEARANCE.TRANSLUCENT"
    >
    </auc-account-balance>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With address</h5>

    <auc-account-balance
      [isCurrency]="true"
      [showAddress]="true"
      [appearance]="BALANCE_APPEARANCE.TRANSLUCENT"
      (onAddressClick)="onAddressClick()"
    >
    </auc-account-balance>
  </div>
</div>
`;
