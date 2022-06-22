export const BasicButtonCodeHtml =
`<div class="doc-grid-container">
  <div class="doc-grid-item">
    <auc-button label="Default" (onClick)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Blue" [color]="COLORS.BLUE" (onClick)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Green" [color]="COLORS.GREEN" (onClick)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Gray" [color]="COLORS.GRAY" (onClick)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="White" [color]="COLORS.WHITE" (onClick)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Orange" [color]="COLORS.ORANGE" (onClick)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Red" color="red" (onClick)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Transparent" [transparent]="true" (onClick)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Disabled" [disabled]="true" (onClick)="onClick($event)"></auc-button>
  </div>
</div>
`;
