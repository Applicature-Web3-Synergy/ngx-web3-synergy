/** Don't forget import { W3sInputModule } from '@applicature/ngx-web3-synergy'; to your module */

import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'doc-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: [ './basic-input.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicInputComponent {
  public suffix = 'ETH';
  public prefix = '$';
  public defaultVal = 'Default Value';
  public disabledVal = 'Disabled Field value';
  public withLabelVal = '';
  public withPlaceholderVal = '';
  public withHintVal = '';
  public withDecimalVal = '0';
  public withSuffixVal = '0';
  public withPrefixVal = '0';
  public nonDecimalsVal = '0';
  public customHeightVal = '';
  public fullWidthVal = '';

}
