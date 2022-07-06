/** Don't forget import { AucButtonModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'doc-buttons-custom-size',
  templateUrl: './buttons-custom-size.component.html',
  styleUrls: [ './buttons-custom-size.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsCustomSizeComponent {

  onClick(event): void {
    console.log('Button with custom size clicked : ', event);
  }

}
