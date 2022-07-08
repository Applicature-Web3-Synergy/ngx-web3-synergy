import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicCopyToClipboardCodeHtml, BasicCopyToClipboardCodeScss, BasicCopyToClipboardCodeTs } from './components';


@Component({
  selector: 'doc-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: [ './copy-to-clipboard.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyToClipboardComponent {
  basicCopyToClipboardTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicCopyToClipboardCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicCopyToClipboardCodeTs,
        lang: CODE_TYPES.JS
      }
    },
    {
      title: 'SCSS',
      code: {
        code: BasicCopyToClipboardCodeScss,
        lang: CODE_TYPES.CSS
      }
    }
  ];
}
