export const CustomDialogCodeHtml =
`<div class="doc-grid-container">
  <div class="doc-grid-item">

    <w3s-button label="Show custom modal"
                (buttonClicked)="showModal()"
    >
    </w3s-button>
  </div>

  <div class="full-width">
    <div class="doc-controls-container">
      <div class="doc-control">
        <mat-form-field appearance="outline">
          <mat-label>Choose dialog Position</mat-label>

          <mat-select [formControl]="dialogPosition">
            <mat-option *ngFor="let item of dialogPositionsList"
                        [value]="item"
            >
              {{item | uppercase}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </div>
  </div>
</div>
`;
