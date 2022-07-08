import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import {
  BasicIconCodeHtml,
  BasicIconCodeTs,
  CustomizedIconCodeHtml,
  CustomizedIconCodeScss,
  CustomizedIconCodeTs
} from './components';


@Component({
  selector: 'doc-icon',
  templateUrl: './icon.component.html',
  styleUrls: [ './icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  basicIconsTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicIconCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicIconCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  customizedIconsTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: CustomizedIconCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: CustomizedIconCodeTs,
        lang: CODE_TYPES.JS
      }
    },
    {
      title: 'SCSS',
      code: {
        code: CustomizedIconCodeScss,
        lang: CODE_TYPES.CSS
      }
    }
  ];
}
