export const BasicAccountBalanceCodeHtml =
`<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <w3s-account-balance></w3s-account-balance>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With currency</h5>

    <w3s-account-balance
      [isCurrency]="true"
    >
    </w3s-account-balance>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Colored</h5>

    <w3s-account-balance
      [isCurrency]="true"
      [color]="COLORS.BLUE"
    >
    </w3s-account-balance>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Transparent</h5>

    <w3s-account-balance
      [isCurrency]="true"
      [appearance]="BALANCE_APPEARANCE.TRANSPARENT"
    >

    </w3s-account-balance>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Translucent</h5>

    <w3s-account-balance
      [isCurrency]="true"
      [appearance]="BALANCE_APPEARANCE.TRANSLUCENT"
    >
    </w3s-account-balance>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With address</h5>

    <w3s-account-balance
      [isCurrency]="true"
      [showAddress]="true"
      [appearance]="BALANCE_APPEARANCE.TRANSLUCENT"
      (accountClicked)="accountClicked()"
    >
    </w3s-account-balance>
  </div>
</div>
`;
