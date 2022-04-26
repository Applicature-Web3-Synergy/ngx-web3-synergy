import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import {
  BasicButtonCodeHtml,
  BasicButtonCodeTs,
  ButtonsCustomSizeCodeHtml,
  ButtonsCustomSizeCodeScss,
  ButtonsCustomSizeCodeTs,
  ButtonWithIconCodeHtm,
  ButtonWithIconCodeTs,
  ButtonWithIdenticonCodeHtml,
  ButtonWithIdenticonCodeTs,
  IconButtonCodeHtml,
  IconButtonCodeTs
} from './components';


@Component({
  selector: 'doc-button',
  templateUrl: './button.component.html',
  styleUrls: [ './button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  basicButtonsTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicButtonCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicButtonCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  iconButtonsTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: IconButtonCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: IconButtonCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  buttonsWithIconsTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: ButtonWithIconCodeHtm,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: ButtonWithIconCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  buttonsWithIdenticonTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: ButtonWithIdenticonCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: ButtonWithIdenticonCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  buttonsCustomSizeTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: ButtonsCustomSizeCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: ButtonsCustomSizeCodeTs,
        lang: CODE_TYPES.JS
      }
    },
    {
      title: 'Css',
      code: {
        code: ButtonsCustomSizeCodeScss,
        lang: CODE_TYPES.CSS
      }
    }
  ];
}
