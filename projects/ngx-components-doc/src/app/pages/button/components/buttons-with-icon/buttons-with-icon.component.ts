/** Don't forget import { AucButtonModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { AUC_BUTTON_APPEARANCE, AUC_WLC_ICON } from '@applicature/components';

@Component({
  selector: 'doc-buttons-with-icon',
  templateUrl: './buttons-with-icon.component.html',
  styleUrls: [ './buttons-with-icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsWithIconComponent {
  public COLORS = AS_COLOR_GROUP;
  public BUTTON_APPEARANCE = AUC_BUTTON_APPEARANCE;
  public WLC_ICON = AUC_WLC_ICON;

  onClick(event): void {
    console.log('Button with icon clicked: ', event);
  }

}
