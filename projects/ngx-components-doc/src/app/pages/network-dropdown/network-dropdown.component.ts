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

}
