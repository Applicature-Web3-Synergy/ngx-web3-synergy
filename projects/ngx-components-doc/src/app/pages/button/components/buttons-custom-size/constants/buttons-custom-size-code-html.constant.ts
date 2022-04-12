export const ButtonsCustomSizeCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Custom height</h5>

    <auc-button label="Custom height 35px"
                [height]="35"
                (onClick)="onClick($event)"
    >
    </auc-button>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Custom border radius</h5>

    <auc-button label="Custom border radius"
                [borderRadius]="0"
                (onClick)="onClick($event)"
    >
    </auc-button>
  </div>

  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">Full with</h5>

    <div class="full-width">
      <auc-button label="Full with button"
                  [adaptive]="true"
                  (onClick)="onClick($event)"
      >
      </auc-button>
    </div>
  </div>
</div>
`;