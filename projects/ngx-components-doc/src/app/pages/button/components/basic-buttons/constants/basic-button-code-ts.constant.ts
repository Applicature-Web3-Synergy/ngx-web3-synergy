export const BasicButtonCodeTs = `/** Dont forget import { AucButtonModule } from '@applicature/components'; to your module */

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { AUC_BUTTON_APPEARANCE } from '@applicature/components';


@Component({
  selector: 'doc-basic-buttons',
  templateUrl: './basic-buttons.component.html',
  styleUrls: [ './basic-buttons.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicButtonsComponent {
  public COLORS = AS_COLOR_GROUP;
  public BUTTON_APPEARANCE = AUC_BUTTON_APPEARANCE;

  onClick(event: any): void {
    console.log('Button clicked: ', event);
  }

}
`;
