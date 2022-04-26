import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicRippleCodeHtml, BasicRippleCodeScss, BasicRippleCodeTs } from './components';


@Component({
  selector: 'doc-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: [ './ripple.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RippleComponent {
  basicRippleTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicRippleCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicRippleCodeTs,
        lang: CODE_TYPES.JS
      }
    },
    {
      title: 'SCSS',
      code: {
        code: BasicRippleCodeScss,
        lang: CODE_TYPES.CSS
      }
    }
  ];
}
