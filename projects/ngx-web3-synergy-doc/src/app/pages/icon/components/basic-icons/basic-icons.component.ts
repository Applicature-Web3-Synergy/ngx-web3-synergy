/** Don't forget import { W3sIconModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { W3S_WLC_ICON } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-icons',
  templateUrl: './basic-icons.component.html',
  styleUrls: [ './basic-icons.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicIconsComponent {
  ICONS = W3S_WLC_ICON;
}
