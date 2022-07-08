import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { AppModuleTab } from '../../constants';
import { BasicAccountButtonCodeHtml, BasicAccountButtonCodeTs } from './components';


@Component({
  selector: 'doc-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountButtonComponent {
  accountButtonTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: BasicAccountButtonCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicAccountButtonCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];
}
