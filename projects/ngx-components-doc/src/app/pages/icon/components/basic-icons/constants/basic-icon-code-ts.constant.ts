export const BasicIconCodeTs =
  `/** Don't forget import { AucIconModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AUC_WLC_ICON } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-icons',
  templateUrl: './basic-icons.component.html',
  styleUrls: [ './basic-icons.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicIconsComponent {
  ICONS = AUC_WLC_ICON;
}
`;
