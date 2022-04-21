import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AucWlcIcon } from './types';


@Component({
  selector: 'auc-icon',
  templateUrl: './icon.component.html',
  styleUrls: [ './icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucIconComponent {
  /**
   * Sets css style color. <br>
   * It's an optional parameter.
   */
  @Input()
  public color?: string;

  /**
   * Sets icon. <br>
   * Use enum {@link AUC_WLC_ICON} or other string. <br>
   * If you want to use custom icon, you need to provide url to the image as a string value. <br>
   * It's required parameter.
   */
  @Input()
  public icon!: AucWlcIcon;

  /** @internal */
  public get isImage(): boolean {
    return !this.icon ? false : (/.+\..+$/i).test(this.icon);
  }
}
