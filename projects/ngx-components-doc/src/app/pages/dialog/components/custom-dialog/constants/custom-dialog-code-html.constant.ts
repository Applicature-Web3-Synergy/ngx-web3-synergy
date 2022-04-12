export const CustomDialogCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item">

    <auc-button label="Show custom modal"
                (onClick)="showModal()"
    >
    </auc-button>
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
