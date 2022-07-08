import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import {
  BasicInputCodeHtml,
  BasicInputCodeTs,
  ReactiveFormsInputCodeHtml,
  ReactiveFormsInputCodeTs
} from './components';


@Component({
  selector: 'doc-input',
  templateUrl: './input.component.html',
  styleUrls: [ './input.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  basicInputTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicInputCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicInputCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  reactiveFormsInputTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: ReactiveFormsInputCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: ReactiveFormsInputCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];
}
