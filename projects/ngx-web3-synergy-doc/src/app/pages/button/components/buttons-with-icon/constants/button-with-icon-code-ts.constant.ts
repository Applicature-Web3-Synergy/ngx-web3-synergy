export const ButtonWithIconCodeTs =
  `/** Don't forget import { W3sButtonModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { W3S_BUTTON_APPEARANCE, W3S_WLC_ICON } from '@applicature/ngx-web3-synergy';

@Component({
  selector: 'doc-buttons-with-icon',
  templateUrl: './buttons-with-icon.component.html',
  styleUrls: [ './buttons-with-icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsWithIconComponent {
  public COLORS = AS_COLOR_GROUP;
  public BUTTON_APPEARANCE = W3S_BUTTON_APPEARANCE;
  public WLC_ICON = W3S_WLC_ICON;

  onClick(event: any): void {
    console.log('Button with icon clicked: ', event);
  }

}
`;
