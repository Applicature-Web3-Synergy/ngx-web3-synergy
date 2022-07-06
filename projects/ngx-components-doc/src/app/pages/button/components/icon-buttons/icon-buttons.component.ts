/** Don't forget import { AucButtonModule } from '@applicature/ngx-web3-synergy'; to your module */

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AUC_BUTTON_APPEARANCE, AUC_WLC_ICON } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-icon-buttons',
  templateUrl: './icon-buttons.component.html',
  styleUrls: [ './icon-buttons.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonsComponent {
  public BUTTON_APPEARANCE = AUC_BUTTON_APPEARANCE;
  public WLC_ICON = AUC_WLC_ICON;

  onClick(event): void {
    console.log('Icon Button clicked: ', event);
  }
}
