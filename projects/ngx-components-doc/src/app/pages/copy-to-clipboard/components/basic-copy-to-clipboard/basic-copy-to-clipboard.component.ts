/** Dont forget import { AucCopyToClipboardModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'doc-basic-copy-to-clipboard',
  templateUrl: './basic-copy-to-clipboard.component.html',
  styleUrls: [ './basic-copy-to-clipboard.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicCopyToClipboardComponent {
  public textToCopy = 'This text will be copied';
}
