import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AUC_WLC_ICON } from '@applicature/components';


@Component({
  selector: 'app-example-alerts',
  templateUrl: './example-alerts.component.html',
  styleUrls: ['./example-alerts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleAlertsComponent {
  public WLC_ICON = AUC_WLC_ICON
}
