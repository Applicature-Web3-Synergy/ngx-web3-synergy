export const IconButtonCodeTs =
`/** Don't forget import { W3sButtonModule } from '@applicature/ngx-web3-synergy'; to your module */

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { W3S_BUTTON_APPEARANCE, W3S_WLC_ICON } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-icon-buttons',
  templateUrl: './icon-buttons.component.html',
  styleUrls: [ './icon-buttons.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonsComponent {
  public BUTTON_APPEARANCE = W3S_BUTTON_APPEARANCE;
  public WLC_ICON = W3S_WLC_ICON;

  onClick(event: any): void {
    console.log('Icon Button clicked: ', event);
  }
}
`;
