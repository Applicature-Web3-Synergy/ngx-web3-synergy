/** Don't forget import { AucButtonModule } from '@applicature/ngx-web3-synergy'; to your module */

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';


@Component({
  selector: 'doc-basic-buttons',
  templateUrl: './basic-buttons.component.html',
  styleUrls: [ './basic-buttons.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicButtonsComponent {
  public COLORS = AS_COLOR_GROUP;

  onClick(event): void {
    console.log('Button clicked: ', event);
  }

}
