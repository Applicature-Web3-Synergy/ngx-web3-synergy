import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { AppModuleTab } from '../../constants';
import { BasicAccountButtonCodeHtml, BasicAccountButtonCodeTs } from './components';
import { TableOfContentName } from '../../constants/table-of-content.constant';
import { TableOfContents } from '../../components/table-of-contents/interfaces';


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

  sectionId = TableOfContentName;
  configContent: TableOfContents[] = [
    {
      title: 'Basic',
      url: TableOfContentName.Basic,
      subnav: false,
    },
    {
      title: 'API',
      url: TableOfContentName.API,
      subnav: false,
    },
    {
      title: 'W3sAccountButtonComponent',
      url: TableOfContentName.W3sAccountButtonComponent,
      subnav: true,
    }
  ];
}
