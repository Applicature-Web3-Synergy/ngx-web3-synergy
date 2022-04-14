export const BasicSpinnerCodeTs = `/** Dont forget import { AucSpinnerModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'doc-basic-spinner',
  templateUrl: './basic-spinner.component.html',
  styleUrls: [ './basic-spinner.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicSpinnerComponent {

}
`;
