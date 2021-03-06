/** Don't forget import { W3sInputModule } from '@applicature/ngx-web3-synergy'; to your module */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'doc-reactive-form-input',
  templateUrl: './reactive-form-input.component.html',
  styleUrls: [ './reactive-form-input.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormInputComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      field: [ '' ],
      requiredField: [ '', [ Validators.required ] ]
    });
  }

}
