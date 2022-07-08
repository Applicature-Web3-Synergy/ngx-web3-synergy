import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicShortAddressCodeHtml, BasicShortAddressCodeTs } from './components';


@Component({
  selector: 'doc-short-address',
  templateUrl: './short-address.component.html',
  styleUrls: [ './short-address.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortAddressComponent {
  basicShortAddressTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicShortAddressCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicShortAddressCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];
}
