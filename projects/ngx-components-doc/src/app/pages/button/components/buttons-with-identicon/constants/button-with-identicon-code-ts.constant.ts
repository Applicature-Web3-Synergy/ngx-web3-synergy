export const ButtonWithIdenticonCodeTs =
  `/** Don't forget import { AucButtonModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { AUC_IDENTICON_POSITION, aucGenerateJazzicon } from '@applicature/components';

import { exampleEthAddress } from '../../../../constants';


@Component({
  selector: 'doc-buttons-with-identicon',
  templateUrl: './buttons-with-identicon.component.html',
  styleUrls: [ './buttons-with-identicon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsWithIdenticonComponent {
  public COLORS = AS_COLOR_GROUP;
  public IDENTICON_POSITION = AUC_IDENTICON_POSITION;
  public identicon: HTMLDivElement = aucGenerateJazzicon(exampleEthAddress);

  onClick(event: any): void {
    console.log('Button with identicon clicked: ', event);
  }

}
`;
