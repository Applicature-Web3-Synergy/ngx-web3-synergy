import { Component, ChangeDetectionStrategy } from '@angular/core';

import { W3S_WLC_ICON } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'app-example-alerts',
  templateUrl: './example-alerts.component.html',
  styleUrls: ['./example-alerts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleAlertsComponent {
  public WLC_ICON = W3S_WLC_ICON
}
