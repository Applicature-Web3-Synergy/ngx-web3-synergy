export const BasicAlertCodeTs = `/** Dont forget import { AucAlertModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AS_COLOR_GROUP } from '@applicature/styles';
import { AUC_WLC_ICON } from '../../../../../../../applicature/components/src/lib/icon';
import { AUC_ALERT_POSITION } from '../../../../../../../applicature/components/src/lib/alert';


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
