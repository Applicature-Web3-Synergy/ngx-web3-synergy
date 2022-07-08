/** Don't forget import { W3sAlertModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { W3S_ALERT_POSITION, W3S_WLC_ICON } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-alert',
  templateUrl: './basic-alert.component.html',
  styleUrls: [ './basic-alert.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicAlertComponent {
  public COLORS = AS_COLOR_GROUP;
  public WLC_ICON = W3S_WLC_ICON;
  public ALERT_POSITION = W3S_ALERT_POSITION;

}
