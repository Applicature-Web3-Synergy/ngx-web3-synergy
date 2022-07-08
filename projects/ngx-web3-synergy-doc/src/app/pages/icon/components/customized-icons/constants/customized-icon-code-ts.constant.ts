export const CustomizedIconCodeTs = `
/** Don't forget import { W3sIconModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'doc-customized-icons',
  templateUrl: './customized-icons.component.html',
  styleUrls: [ './customized-icons.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizedIconsComponent {
}
`;
