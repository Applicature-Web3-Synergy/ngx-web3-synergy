export const BasicButtonCodeHtml =
`<div class="doc-grid-container">
  <div class="doc-grid-item">
    <auc-button label="Default" (buttonClicked)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Blue" [color]="COLORS.BLUE" (buttonClicked)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Green" [color]="COLORS.GREEN" (buttonClicked)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Gray" [color]="COLORS.GRAY" (buttonClicked)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="White" [color]="COLORS.WHITE" (buttonClicked)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Orange" [color]="COLORS.ORANGE" (buttonClicked)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Red" color="red" (buttonClicked)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Transparent" [transparent]="true" (buttonClicked)="onClick($event)"></auc-button>
  </div>

  <div class="doc-grid-item">
    <auc-button label="Disabled" [disabled]="true" (buttonClicked)="onClick($event)"></auc-button>
  </div>
</div>
`;
