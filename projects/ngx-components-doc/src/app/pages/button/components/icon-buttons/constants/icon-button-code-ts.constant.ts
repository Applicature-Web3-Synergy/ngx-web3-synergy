export const IconButtonCodeTs =
`/** Don't forget import { AucButtonModule } from '@applicature/components'; to your module */

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { AUC_BUTTON_APPEARANCE, AUC_WLC_ICON } from '@applicature/components';


@Component({
  selector: 'doc-icon-buttons',
  templateUrl: './icon-buttons.component.html',
  styleUrls: [ './icon-buttons.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonsComponent {
  public BUTTON_APPEARANCE = AUC_BUTTON_APPEARANCE;
  public WLC_ICON = AUC_WLC_ICON;

  onClick(event: any): void {
    console.log('Icon Button clicked: ', event);
  }
}
`;
