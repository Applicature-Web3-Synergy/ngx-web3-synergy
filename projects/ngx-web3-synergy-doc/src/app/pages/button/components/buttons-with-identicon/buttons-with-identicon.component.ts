/** Don't forget import { W3sButtonModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { W3S_IDENTICON_POSITION, w3sGenerateJazzicon } from '@applicature/ngx-web3-synergy';

import { exampleEthAddress } from '../../../../constants';


@Component({
  selector: 'doc-buttons-with-identicon',
  templateUrl: './buttons-with-identicon.component.html',
  styleUrls: [ './buttons-with-identicon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsWithIdenticonComponent {
  public COLORS = AS_COLOR_GROUP;
  public IDENTICON_POSITION = W3S_IDENTICON_POSITION;
  public identicon: HTMLDivElement = w3sGenerateJazzicon(exampleEthAddress);

  onClick(event): void {
    console.log('Button with identicon clicked: ', event);
  }

}
