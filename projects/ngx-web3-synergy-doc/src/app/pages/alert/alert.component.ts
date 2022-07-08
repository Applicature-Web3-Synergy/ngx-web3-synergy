import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicAlertCodeHtml, BasicAlertCodeTs } from './components';

@Component({
  selector: 'doc-alert',
  templateUrl: './alert.component.html',
  styleUrls: [ './alert.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  alertTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicAlertCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicAlertCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

}
