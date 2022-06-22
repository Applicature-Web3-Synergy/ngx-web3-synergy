import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import {
  BasicConnectWalletCodeHtml,
  BasicConnectWalletCodeTs,
  ConnectWalletAsIconCodeHtml,
  ConnectWalletAsIconCodeTs,
  ConnectWalletWithNetworkCodeHtml,
  ConnectWalletWithNetworkCodeTs,
  CustomConnectButtonCodeHtml,
  CustomConnectButtonCodeTs,
  CustomConnectWalletCodeHtml,
  CustomConnectWalletCodeScss,
  CustomConnectWalletCodeTs
} from './components';
import { AppModuleTab } from '../../constants';


@Component({
  selector: 'doc-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: [ './connect-wallet.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectWalletComponent {
  basicCWTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: BasicConnectWalletCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicConnectWalletCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  cwAsIconTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: ConnectWalletAsIconCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: ConnectWalletAsIconCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  cwWithNetworkTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: ConnectWalletWithNetworkCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: ConnectWalletWithNetworkCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  customBtnCwTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: CustomConnectButtonCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: CustomConnectButtonCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  customCwTabs: ExampleCardTab[] = [
    AppModuleTab,
    {
      title: 'HTML',
      code: {
        code: CustomConnectWalletCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: CustomConnectWalletCodeTs,
        lang: CODE_TYPES.JS
      }
    },
    {
      title: 'SCSS',
      code: {
        code: CustomConnectWalletCodeScss,
        lang: CODE_TYPES.CSS
      }
    }
  ];

}
