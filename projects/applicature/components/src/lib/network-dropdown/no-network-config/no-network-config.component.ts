import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AucNoNetworkConfigDialogDataI } from './interfaces';
import { ApplicatureDialogConfig, ApplicatureDialogRef } from '../../applicature-dialog';


@Component({
  selector: 'applicature-no-network-config',
  templateUrl: './no-network-config.component.html',
  styleUrls: [ './no-network-config.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucNoNetworkConfigComponent {

  constructor(public config: ApplicatureDialogConfig<AucNoNetworkConfigDialogDataI>,
              private _dialogRef: ApplicatureDialogRef) {
  }

  onClose(): void {
    this._dialogRef.close();
  }
}
