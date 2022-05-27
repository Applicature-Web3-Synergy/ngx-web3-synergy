import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicAvatarCodeHtml, BasicAvatarCodeTs } from './components';


@Component({
  selector: 'doc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: [ './avatar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  basicAvatarTabs: ExampleCardTab[] = [
    {
      title: 'HTML',
      code: {
        code: BasicAvatarCodeHtml,
        lang: CODE_TYPES.HTML
      }
    },
    {
      title: 'TS',
      code: {
        code: BasicAvatarCodeTs,
        lang: CODE_TYPES.JS
      }
    }
  ];
}
