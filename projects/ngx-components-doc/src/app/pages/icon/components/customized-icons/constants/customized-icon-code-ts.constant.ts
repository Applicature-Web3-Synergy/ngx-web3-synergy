export const CustomizedIconCodeTs = `/** Dont forget import { AucIconModule } from '@applicature/components'; to your module */

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
