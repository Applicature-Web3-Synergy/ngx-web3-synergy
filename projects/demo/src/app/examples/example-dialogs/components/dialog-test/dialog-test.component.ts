import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ApplicatureDialogConfig, ApplicatureDialogRef } from '@applicature/components';
import { AS_COLOR_GROUP } from '@applicature/styles';


@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogTestComponent {
  public COLORS = AS_COLOR_GROUP;

  constructor(public config: ApplicatureDialogConfig, private _dialogRef: ApplicatureDialogRef<string>) {
  }

  onClose(val: any): void {
    this._dialogRef.close(val);
  }

}
