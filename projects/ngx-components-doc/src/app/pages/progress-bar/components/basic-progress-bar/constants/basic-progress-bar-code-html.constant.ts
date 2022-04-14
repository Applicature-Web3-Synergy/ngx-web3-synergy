export const BasicProgressBarCodeHtml = `<div class="doc-grid-container">
  <div class="full-width doc-progress-bar">
    <auc-progress-bar [progress]="progressForm.get('progress')?.value ?? 0"
                      [total]="progressForm.get('total')?.value ?? 100"
    >
    </auc-progress-bar>
  </div>

  <div class="full-width">
    <form [formGroup]="progressForm" class="doc-form">
      <h4 class="doc-controls-title">Customize overlay</h4>

      <div class="doc-controls-container">
        <div class="doc-control">
          <mat-form-field class="example-full-width" appearance="outline">
            <mat-label>Total Value</mat-label>
            <input type="number"
                   matInput
                   formControlName="total"
                   min="0"
            >
          </mat-form-field>
        </div>

        <div class="doc-control">
          <mat-form-field class="example-full-width" appearance="outline">
            <mat-label>Current Progress</mat-label>
            <input type="number"
                   matInput
                   formControlName="progress"
                   min="0"
                   [max]="this.progressForm.get('total')?.value ?? 100"
            >
          </mat-form-field>
        </div>
      </div>
    </form>
  </div>
</div>
`;
