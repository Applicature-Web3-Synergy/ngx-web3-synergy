export const BasicAlertCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">Default</h5>

    <div class="full-width">
      <auc-alert text="Default Alert"></auc-alert>
    </div>

  </div>

  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">With Icon</h5>

    <div class="full-width">
      <auc-alert text="Alert with icon" [icon]="WLC_ICON.FAIL"></auc-alert>
    </div>
  </div>

  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">With custom Icon</h5>

    <div class="full-width">
      <auc-alert text="Alert with custom icon" icon="assets/img/icons/eth.svg"></auc-alert>
    </div>
  </div>

  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">Positioned icon</h5>

    <div class="full-width">
      <auc-alert text="Alert with icon position"
                 [icon]="WLC_ICON.WRONG"
                 [iconPosition]="ALERT_POSITION.RIGHT"
      >
      </auc-alert>
    </div>
  </div>

  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">Blue</h5>

    <div class="full-width">
      <auc-alert text="Blue Alert"
                 icon="wcl-icon-fail"
                 [color]="COLORS.BLUE"
      >
      </auc-alert>
    </div>
  </div>

  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">Green</h5>

    <div class="full-width">
      <auc-alert text="Green Alert"
                 icon="wcl-icon-fail"
                 [color]="COLORS.GREEN"
      >
      </auc-alert>
    </div>
  </div>

  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">Gray</h5>

    <div class="full-width">
      <auc-alert text="Gray Alert"
                 icon="wcl-icon-fail"
                 [color]="COLORS.GRAY"
      >
      </auc-alert>
    </div>
  </div>

  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">Orange</h5>

    <div class="full-width">
      <auc-alert text="Orange Alert"
                 icon="wcl-icon-fail"
                 [color]="COLORS.ORANGE"
      >
      </auc-alert>
    </div>
  </div>


  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">Red</h5>

    <div class="full-width">
      <auc-alert text="Red Alert"
                 icon="wcl-icon-fail"
                 [color]="COLORS.RED"
      >
      </auc-alert>
    </div>
  </div>

  <div class="doc-grid-item full-width">
    <h5 class="doc-grid-item-title">White</h5>

    <div class="full-width">
      <auc-alert text="White Alert"
                 icon="wcl-icon-fail"
                 [color]="COLORS.WHITE"
      >
      </auc-alert>
    </div>
  </div>
</div>
`;
