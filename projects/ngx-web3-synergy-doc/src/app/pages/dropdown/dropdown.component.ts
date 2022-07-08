import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import {
  BasicDropdownCodeHtml,
  BasicDropdownCodeScss,
  BasicDropdownCodeTs,
  CustomizedDropdownCodeHtml,
  CustomizedDropdownCodeScss,
  CustomizedDropdownCodeTs
} from './components';


@Component({
  selector: 'doc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: [ './dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  basicDropdownTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicDropdownCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicDropdownCodeTs,
        lang: CODE_TYPES.JS
      }
    },
    {
      title: 'SCSS',
      code: {
        code: BasicDropdownCodeScss,
        lang: CODE_TYPES.CSS
      }
    }
  ];

  customDropdownTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: CustomizedDropdownCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: CustomizedDropdownCodeTs,
        lang: CODE_TYPES.JS
      }
    },
    {
      title: 'SCSS',
      code: {
        code: CustomizedDropdownCodeScss,
        lang: CODE_TYPES.CSS
      }
    }
  ];
}
