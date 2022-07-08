import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { AppModuleTab } from '../../constants';
import { CODE_TYPES } from '../../modules/code-example/enums';
import {
  BasicTransactionHistoryCodeHtml,
  BasicTransactionHistoryCodeTs,
  CustomTransactionHistoryCodeHtml,
  CustomTransactionHistoryCodeTs
} from './components';


@Component({
  selector: 'doc-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: [ './transactions-history.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsHistoryComponent {
  basicTransactionsTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: BasicTransactionHistoryCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicTransactionHistoryCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  customTransactionTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: CustomTransactionHistoryCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: CustomTransactionHistoryCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

}
