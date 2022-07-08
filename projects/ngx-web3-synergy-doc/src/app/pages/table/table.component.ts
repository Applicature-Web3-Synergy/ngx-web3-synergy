import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicTableCodeHtml, BasicTableCodeTs } from './components';


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
}
