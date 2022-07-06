/** Don't forget import { AucCopyToClipboardModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CopyToClipboardAction } from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-basic-copy-to-clipboard',
  templateUrl: './basic-copy-to-clipboard.component.html',
  styleUrls: [ './basic-copy-to-clipboard.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicCopyToClipboardComponent {
  public textToCopy = 'This text will be copied';

  public copied(action: CopyToClipboardAction): void {
    console.log('Action: ', action);
  }
}
