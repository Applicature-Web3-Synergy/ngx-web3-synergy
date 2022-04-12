export const CustomizedAccountBalanceCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item">
    <auc-account-balance
      [isCurrency]="balanceForm.get('showCurrency').value"
      [showAddress]="balanceForm.get('showAddress').value"
      [color]="balanceForm.get('color').value"
      [appearance]="balanceForm.get('appearance').value"
      [addressConfig]="{
                          showIdenticon: accountAddressForm.get('showIdenticon').value,
                          identiconPosition: accountAddressForm.get('identiconPosition').value,
                          color: accountAddressForm.get('color').value,
                          disabled: accountAddressForm.get('disabled').value
                        }"
      (onAddressClick)="onAddressClick()"
    >
    </auc-account-balance>
  </div>

  <div class="full-width">
    <form [formGroup]="balanceForm">
      <div class="doc-controls-container">
        <div class="doc-control">
          <mat-checkbox formControlName="showCurrency">Show currency icon</mat-checkbox>
        </div>

        <div class="doc-control">
          <mat-checkbox formControlName="showAddress">Show account address</mat-checkbox>
        </div>
      </div>

      <div class="doc-controls-container">
        <div class="doc-control">
          <mat-form-field appearance="outline">
            <mat-label>Choose appearance</mat-label>

            <mat-select formControlName="appearance">
              <mat-option *ngFor="let item of balanceAppearanceList"
                          [value]="item"
              >
                {{item | uppercase}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="doc-control">
          <mat-form-field appearance="outline">
            <mat-label>Choose balance color</mat-label>

            <mat-select formControlName="color">
              <mat-option *ngFor="let item of colorsList"
                          [value]="item"
              >
                {{item | uppercase}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </form>

    <form *ngIf="balanceForm.get('showAddress').value" [formGroup]="accountAddressForm">
      <h4 class="doc-controls-title">Customize AccountAddress123</h4>

      <div class="doc-controls-container">
        <div class="doc-control">
          <mat-checkbox formControlName="disabled">Disable Account address</mat-checkbox>
        </div>

        <div class="doc-control">
          <mat-checkbox formControlName="showIdenticon">Show account identicon</mat-checkbox>
        </div>
      </div>

      <div class="doc-controls-container">
        <div class="doc-control">
          <mat-form-field appearance="outline">
            <mat-label>Choose identicon position</mat-label>

            <mat-select formControlName="identiconPosition">
              <mat-option *ngFor="let item of identiconPositionsList"
                          [value]="item"
              >
                {{item | uppercase}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="doc-control">
          <mat-form-field appearance="outline">
            <mat-label>Choose account address color</mat-label>

            <mat-select formControlName="color">
              <mat-option *ngFor="let item of colorsList"
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
