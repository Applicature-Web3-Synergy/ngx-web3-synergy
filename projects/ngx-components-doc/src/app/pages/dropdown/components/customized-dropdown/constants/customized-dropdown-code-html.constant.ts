export const CustomizedDropdownCodeHtml =
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
                       [config]="{
                          overlay: {
                            transparent: overlayForm.get('transparent').value,
                            overlayClass: overlayForm.get('customClass').value
                          },
                          position: {
                            vertical: dropdownForm.get('vertical').value,
                            horizontal: dropdownForm.get('horizontal').value
                          },
                          class: dropdownForm.get('class').value,
                          minWidth: dropdownForm.get('minWidth').value,
                          minHeight: dropdownForm.get('minHeight').value
                       }"

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

  <div class="full-width">
    <form [formGroup]="overlayForm" class="doc-form">
      <h4 class="doc-controls-title">Customize overlay</h4>

      <div class="doc-controls-container">
        <div class="doc-control">
          <mat-checkbox formControlName="transparent">Transparent overlay</mat-checkbox>
        </div>

        <div class="doc-control">
          <mat-form-field class="example-full-width" appearance="outline">
            <mat-label>Custom overlay class</mat-label>
            <input matInput formControlName="customClass">
          </mat-form-field>
        </div>
      </div>
    </form>

    <form [formGroup]="dropdownForm" class="doc-form">
      <h4 class="doc-controls-title">Customize Dropdown</h4>

      <div class="doc-controls-container">
        <div class="doc-control">
          <mat-form-field class="example-full-width" appearance="outline">
            <mat-label>Custom dropdown class</mat-label>
            <input matInput formControlName="class">
          </mat-form-field>
        </div>

        <div class="doc-control">
          <mat-form-field class="example-full-width" appearance="outline">
            <mat-label>Dropdown minWidth</mat-label>
            <input matInput formControlName="minWidth" type="number">
          </mat-form-field>
        </div>

        <div class="doc-control">
          <mat-form-field class="example-full-width" appearance="outline">
            <mat-label>Dropdown minHeight</mat-label>
            <input matInput formControlName="minHeight" type="number">
          </mat-form-field>
        </div>
      </div>

      <div class="doc-controls-container">
        <div class="doc-control">
          <mat-form-field appearance="outline">
            <mat-label>Vertical position</mat-label>

            <mat-select formControlName="vertical">
              <mat-option *ngFor="let item of verticalPositionsList"
                          [value]="item"
              >
                {{item | uppercase}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="doc-control">
          <mat-form-field appearance="outline">
            <mat-label>Horizontal position</mat-label>

            <mat-select formControlName="horizontal">
              <mat-option *ngFor="let item of horizontalPositionsList"
                          [value]="item"
              >
                {{item | uppercase}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </form>
  </div>
</div>
`;
