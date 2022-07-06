export const BasicAlertCodeTs =
  `/** Don't forget import { AucAlertModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { AUC_ALERT_POSITION, AUC_WLC_ICON } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-alert',
  templateUrl: './basic-alert.component.html',
  styleUrls: [ './basic-alert.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicAlertComponent {
  public COLORS = AS_COLOR_GROUP;
  public WLC_ICON = AUC_WLC_ICON;
  public ALERT_POSITION = AUC_ALERT_POSITION;

}
`;
