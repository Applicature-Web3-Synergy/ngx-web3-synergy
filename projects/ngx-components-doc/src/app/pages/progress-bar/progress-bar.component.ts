import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicProgressBarCodeHtml, BasicProgressBarCodeTs } from './components';


@Component({
  selector: 'doc-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: [ './progress-bar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  basicProgressBarTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicProgressBarCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicProgressBarCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];
}
