import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { AppModuleTab } from '../../constants';
import { CODE_TYPES } from '../../modules/code-example/enums';
import {
  BasicNetworkDropdownCodeHtml,
  BasicNetworkDropdownCodeTs,
  CustomizedNetworkDropdownCodeTs,
  CustomizedNetworkDropdownCodeHtml
} from './components';
import { TableOfContents } from '../../components/table-of-contents/interfaces';
import { TableOfContentName } from '../../constants/table-of-content.constant';


@Component({
  selector: 'doc-network-dropdown',
  templateUrl: './network-dropdown.component.html',
  styleUrls: [ './network-dropdown.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkDropdownComponent {
  basicNetworkDropdownTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: BasicNetworkDropdownCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicNetworkDropdownCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  customizedNetworkDropdownTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: CustomizedNetworkDropdownCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: CustomizedNetworkDropdownCodeTs,
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
      title: 'W3sNetworkDropdown Component',
      url: TableOfContentName.W3sNetworkDropdownComponent,
      subnav: true,
    }
  ];
}
