import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { AucWlcIcon } from './types';


@Component({
  selector: 'auc-icon',
  templateUrl: './icon.component.html',
  styleUrls: [ './icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucIconComponent {
  /**
   * {@link color} - It's an `@Input()` parameter.
   * Sets css style color;
   * This is an optional parameter.
   */
  @Input()
  public color?: string;

  /**
   * {@link icon} - It's an `@Input()` parameter.
   * @param value type uses enum {@link AUC_WLC_ICON} or string;
   * If you want to use custom icon you need to provide url to the image as a string value.
   */
  @Input()
  public set icon(value: AucWlcIcon) {
    this.isImage = (/.+\..+$/i).test(value);

    this._icon = value;
  }

  /** @internal */
  public get icon(): string {
    return this._icon;
  }

  private _icon!: string;

  public isImage: boolean = false;
}
