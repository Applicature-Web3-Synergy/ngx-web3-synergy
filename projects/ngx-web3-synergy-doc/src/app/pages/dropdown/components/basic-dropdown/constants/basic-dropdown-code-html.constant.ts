export const BasicDropdownCodeHtml =
`<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <w3s-button (showHide)="showHideDropdown($event)"
                label="Custom Dropdown Menu"
                w3sTrigger
                #customMenuTrigger="w3sTrigger"
    >
    </w3s-button>

    <w3s-dropdown-menu *ngIf="isOpened"
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
    </w3s-dropdown-menu>
  </div>
</div>
`;
