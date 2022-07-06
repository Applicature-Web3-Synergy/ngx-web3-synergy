export const BasicRippleCodeTs =
  `/** Don't forget import { AucRippleModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'doc-basic-ripple',
  templateUrl: './basic-ripple.component.html',
  styleUrls: [ './basic-ripple.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicRippleComponent {

}
`;
