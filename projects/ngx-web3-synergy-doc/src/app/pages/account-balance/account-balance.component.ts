import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import {
  BasicAccountBalanceCodeHtml,
  BasicAccountBalanceCodeTs,
  CustomizedAccountBalanceCodeHtml,
  CustomizedAccountBalanceCodeTs
} from './components';
import { AppModuleTab } from '../../constants';
import { TableOfContentName } from '../../constants/table-of-content.constant';
import { TableOfContents } from '../../components/table-of-contents/interfaces';


@Component({
  selector: 'doc-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: [ './account-balance.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountBalanceComponent {
  acBalanceTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: BasicAccountBalanceCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicAccountBalanceCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  acBalanceCustomizeTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: CustomizedAccountBalanceCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: CustomizedAccountBalanceCodeTs,
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
      title: 'Customized',
      url: TableOfContentName.Customized,
      subnav: false,
    },
    {
      title: 'API',
      url: TableOfContentName.API,
      subnav: false,
    },
    {
      title: 'W3sAccountBalanceComponent',
      url: TableOfContentName.W3sAccountBalanceComponent,
      subnav: true,
    }
  ];
}
