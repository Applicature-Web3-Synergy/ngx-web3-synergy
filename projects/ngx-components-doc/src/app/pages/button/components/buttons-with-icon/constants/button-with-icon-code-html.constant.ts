export const ButtonWithIconCodeHtm = `<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With left icon</h5>

    <auc-button label="Button"
                [leftIcon]="WLC_ICON.STAR"
                (onClick)="onClick($event)"
    >
    </auc-button>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With right icon</h5>

    <auc-button label="Button"
                rightIcon="wcl-icon-recent"
                [color]="COLORS.WHITE"
                (onClick)="onClick($event)"
    >
    </auc-button>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With left and right icon</h5>

    <auc-button label="Transparent"
                [leftIcon]="WLC_ICON.WALLET"
                [rightIcon]="WLC_ICON.RECENT"
                [transparent]="true"
                (onClick)="onClick($event)"
    >
    </auc-button>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With custom icon</h5>

    <auc-button label="Button"
                rightIcon="assets/img/icons/eth.svg"
                [color]="COLORS.RED"
                (onClick)="onClick($event)"
    >
    </auc-button>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With pending</h5>

    <auc-button label="1 pending"
                [color]="COLORS.WHITE"
                [pending]="true"
                (onClick)="onClick($event)"
    >
    </auc-button>
  </div>
</div>
`;
