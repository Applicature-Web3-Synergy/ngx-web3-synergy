import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicFaucetCodeHtml, BasicFaucetCodeTs } from './components';
import { TableOfContentName } from '../../constants/table-of-content.constant';
import { TableOfContents } from '../../components/table-of-contents/interfaces';

@Component({
  selector: 'doc-faucet',
  templateUrl: './faucet.component.html',
  styleUrls: ['./faucet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaucetComponent {

  basicFaucetTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicFaucetCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicFaucetCodeTs,
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
      title: 'W3sFaucetComponent',
      url: TableOfContentName.W3sFaucetComponent,
      subnav: true,
    }
  ];
}
