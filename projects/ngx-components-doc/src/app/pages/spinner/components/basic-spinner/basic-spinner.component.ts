/** Don't forget import { AucSpinnerModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'doc-basic-spinner',
  templateUrl: './basic-spinner.component.html',
  styleUrls: [ './basic-spinner.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicSpinnerComponent {

}
