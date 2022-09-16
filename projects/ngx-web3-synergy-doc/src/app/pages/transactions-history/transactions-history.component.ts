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
import { TableOfContentName } from '../../constants/table-of-content.constant';
import { TableOfContents } from '../../components/table-of-contents/interfaces';


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

  sectionId = TableOfContentName;
  configContent: TableOfContents[] = [
    {
      title: 'Basic',
      url: TableOfContentName.Basic,
      subnav: false,
    },
    {
      title: 'Custom',
      url: TableOfContentName.Customized,
      subnav: false,
    },
    {
      title: 'API',
      url: TableOfContentName.API,
      subnav: false,
    },
    {
      title: 'W3sTransactionsHistory Component',
      url: TableOfContentName.W3sTransactionsHistoryComponent,
      subnav: true,
    },
    {
      title: 'W3sTransactionsList Component',
      url: TableOfContentName.W3sTransactionsListComponent,
      subnav: true,
    },
    {
      title: 'W3sTransaction Service',
      url: TableOfContentName.W3sTransactionService,
      subnav: true,
    }
  ];
}
