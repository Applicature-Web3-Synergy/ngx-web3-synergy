/** Dont forget import { AucInputModule } from '@applicature/components'; to your module */

import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'doc-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: [ './basic-input.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicInputComponent {
  public suffix: string = 'ETH';
  public prefix: string = '$';
  public defaultVal: string = 'Default Value';
  public disabledVal: string = 'Disabled Field value';
  public withLabelVal: string = '';
  public withPlaceholderVal: string = '';
  public withHintVal: string = '';
  public withDecimalVal: string = '0';
  public withSuffixVal: string = '0';
  public withPrefixVal: string = '0';
  public nonDecimalsVal: string = '0';
  public customHeightVal: string = '';
  public fullWidthVal: string = '';

}
