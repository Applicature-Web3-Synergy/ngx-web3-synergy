import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AucNoNetworkConfigDialogDataI } from './interfaces';
import { AucDialogConfig, AucDialogRef } from '../../dialog';


@Component({
  selector: 'auc-no-network-config',
  templateUrl: './no-network-config.component.html',
  styleUrls: [ './no-network-config.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucNoNetworkConfigComponent {

  constructor(public config: AucDialogConfig<AucNoNetworkConfigDialogDataI>,
              private _dialogRef: AucDialogRef) {
  }

  onClose(): void {
    this._dialogRef.close();
  }
}
