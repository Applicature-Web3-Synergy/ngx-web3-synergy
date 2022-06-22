export const BasicDropdownCodeHtml =
`<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <auc-button (showHide)="showHideDropdown($event)"
                label="Custom Dropdown Menu"
                aucTrigger
                #customMenuTrigger="aucTrigger"
    >
    </auc-button>

    <auc-dropdown-menu *ngIf="isOpened"
                       [trigger]="customMenuTrigger"
    >
      <div class="custom-dropdown-container">
        <div class="custom-dropdown-item"
             *ngFor="let item of dropdownList"
             (click)="onDropdownOptionClicked(item)"
        >
          {{item.title}}
        </div>
      </div>
    </auc-dropdown-menu>
  </div>
</div>
`;
