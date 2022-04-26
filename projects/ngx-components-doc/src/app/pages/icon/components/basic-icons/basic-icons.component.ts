/** Don't forget import { AucIconModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AUC_WLC_ICON } from '@applicature/components';


@Component({
  selector: 'doc-basic-icons',
  templateUrl: './basic-icons.component.html',
  styleUrls: [ './basic-icons.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicIconsComponent {
  ICONS = AUC_WLC_ICON;
}
