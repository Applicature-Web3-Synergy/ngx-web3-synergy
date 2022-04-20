import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';

import { AS_COLOR_GROUP, AsColors } from '@applicature/styles';

import { AUC_WLC_ICON, AucWlcIcon } from '../icon';
import { AucSetStyleProp } from '../directives';


@Component({
  selector: 'auc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: [ './avatar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AucAvatarComponent implements OnChanges {
  /**
   * {@link src} - It's an `@Input()` parameter.
   * Sets provided image url as avatar otherwise default user icon will be shown.
   * It's an optional parameter.
   */
  @Input()
  public src?: string;

  /**
   * {@link size} - It's an `@Input()` parameter.
   * Sets size of the avatar.
   * It's an optional parameter. The default value is 40.
   */
  @Input()
  public size: number = 40;

  public iconStyleProperties: AucSetStyleProp[] = [];
  public defaultUserIcon: AucWlcIcon = AUC_WLC_ICON.USER;
  public defaultUserIconColor: string = AsColors[AS_COLOR_GROUP.WHITE].base;

  constructor() {
    this.setIconStylesProperty();
  }


  ngOnChanges(): void {
    this.setIconStylesProperty();
  }

  private setIconStylesProperty(): void {
    this.iconStyleProperties = [
      {
        name: 'width',
        value: `${this.size}px`
      },
      {
        name: 'height',
        value: `${this.size}px`
      }
    ].concat(this.src
      ? []
      : {
        name: '--auc-avatar-icon-size',
        value: `${this.size - (this.size / 3)}px`
      }
    )
  }
}
