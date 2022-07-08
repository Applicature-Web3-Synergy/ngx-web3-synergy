export const ButtonsCustomSizeCodeHtml =
`<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Custom height</h5>

    <w3s-button label="Custom height 35px"
                [height]="35"
                (buttonClicked)="onClick($event)"
    >
    </w3s-button>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Custom border radius</h5>

    <w3s-button label="Custom border radius"
                [borderRadius]="0"
                (buttonClicked)="onClick($event)"
    >
    </w3s-button>
  </div>

  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">Full with</h5>

    <div class="full-width">
      <w3s-button label="Full with button"
                  [adaptive]="true"
                  (buttonClicked)="onClick($event)"
      >
      </w3s-button>
    </div>
  </div>
</div>
`;
