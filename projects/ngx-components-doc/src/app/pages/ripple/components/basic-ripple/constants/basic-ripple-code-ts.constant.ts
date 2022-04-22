export const BasicRippleCodeTs =
  `/** Don't forget import { AucRippleModule } from '@applicature/components'; to your module */

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
