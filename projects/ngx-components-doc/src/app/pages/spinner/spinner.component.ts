import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicSpinnerCodeHtml, BasicSpinnerCodeTs } from './components';


@Component({
  selector: 'doc-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [ './spinner.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  basicSpinnerTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicSpinnerCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicSpinnerCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

}
