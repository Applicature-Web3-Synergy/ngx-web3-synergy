import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicDialogCodeHtml, BasicDialogCodeTs, CustomDialogCodeHtml, CustomDialogCodeTs } from './components';


@Component({
  selector: 'doc-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  basicDialogTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicDialogCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicDialogCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];

  customDialogTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: CustomDialogCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: CustomDialogCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];
}
