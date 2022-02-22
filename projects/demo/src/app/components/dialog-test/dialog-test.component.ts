import { Component } from '@angular/core';
import { DialogConfig, DialogRef } from '@applicature/components';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss']
})
export class DialogTestComponent  {
  constructor(public config: DialogConfig, private _dialogRef: DialogRef<string>) {

  }

  onClose() {
    this._dialogRef.close('some value')
  }

}
