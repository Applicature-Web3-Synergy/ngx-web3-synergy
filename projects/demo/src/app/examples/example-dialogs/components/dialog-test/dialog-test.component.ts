import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ApplicatureDialogConfig, ApplicatureDialogRef } from '@applicature/components';


@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogTestComponent {
  constructor(public config: ApplicatureDialogConfig, private _dialogRef: ApplicatureDialogRef<string>) {
  }

  onClose(val: any): void {
    this._dialogRef.close(val);
  }

}
