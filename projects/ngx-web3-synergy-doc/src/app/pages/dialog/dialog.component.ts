import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleCardTab } from '../../modules/example-card/interfaces';
import { CODE_TYPES } from '../../modules/code-example/enums';
import { BasicDialogCodeHtml, BasicDialogCodeTs, CustomDialogCodeHtml, CustomDialogCodeTs } from './components';
import { TableOfContentName } from '../../constants/table-of-content.constant';
import { TableOfContents } from '../../components/table-of-contents/interfaces';


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

  sectionId = TableOfContentName;
  configContent: TableOfContents[] = [
    {
      title: 'Basic',
      url: TableOfContentName.Basic,
      subnav: false,
    },
    {
      title: 'Custom dialog',
      url: TableOfContentName.CustomDialog,
      subnav: false,
    },
    {
      title: 'API',
      url: TableOfContentName.API,
      subnav: false,
    },
    {
      title: 'W3sDialogService',
      url: TableOfContentName.W3sDialogService,
      subnav: true,
    }
  ];
}
