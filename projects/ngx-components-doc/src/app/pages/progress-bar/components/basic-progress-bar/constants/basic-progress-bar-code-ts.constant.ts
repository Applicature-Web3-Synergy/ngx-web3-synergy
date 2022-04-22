export const BasicProgressBarCodeTs =
  `/** Don't forget import { AucProgressBarModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { BaseSubscriber } from '@applicature/components';


@Component({
  selector: 'doc-basic-progress-bar',
  templateUrl: './basic-progress-bar.component.html',
  styleUrls: [ './basic-progress-bar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicProgressBarComponent extends BaseSubscriber {
  public progressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    super();

    this.initForm();
  }

  private initForm(): void {
    const total = 100; // This value used by default.

    this.progressForm = this.fb.group({
      total: [ total, [ Validators.min(0) ] ],
      progress: [ 50, [ Validators.min(0), Validators.max(total) ] ],
    });

    this.progressForm.get('total').valueChanges
      .pipe(takeUntil(this.notifier))
      .subscribe((res) => {
        this.progressForm.get('progress').setValidators([ Validators.min(0), Validators.max(res) ]);
      });
  }

}
`;
