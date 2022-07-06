import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AucDialogConfig, AucDialogRef } from '@applicature/ngx-web3-synergy';
import { AS_COLOR_GROUP } from '@applicature/styles';


@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogTestComponent {
  public COLORS = AS_COLOR_GROUP;

  constructor(public config: AucDialogConfig, private _dialogRef: AucDialogRef<string>) {
  }

  onClose(val): void {
    this._dialogRef.close(val);
  }

}
