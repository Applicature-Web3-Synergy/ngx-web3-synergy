import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicTableCodeHtml, BasicTableCodeTs } from './components';
import { TableOfContentName } from '../../constants/table-of-content.constant';
import { TableOfContents } from '../../components/table-of-contents/interfaces';


@Component({
  selector: 'doc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  basicTableTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicTableCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicTableCodeTs,
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
      title: 'W3sTableComponent',
      url: TableOfContentName.W3sTableComponent,
      subnav: true,
    }
  ];
}
