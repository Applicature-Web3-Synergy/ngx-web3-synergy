export const ButtonWithIdenticonCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Identicon position right</h5>

    <auc-button label="0xXXX...XXXX" [identicon]="identicon" (onClick)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Identicon position left</h5>

    <auc-button label="0xXXX...XXXX"
                [identicon]="identicon"
                [identiconPosition]="IDENTICON_POSITION.LEFT"
                (onClick)="onClick($event)"
    >
    </auc-button>
  </div>
</div>
`;
