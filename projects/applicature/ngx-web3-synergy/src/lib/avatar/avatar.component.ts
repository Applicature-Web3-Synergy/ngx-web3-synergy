import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';

import { AS_COLOR_GROUP, AsColors } from '@applicature/styles';

import { W3S_WLC_ICON, W3sWlcIcon } from '../icon';
import { W3sSetStyleProp } from '../directives';


@Component({
  selector: 'w3s-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: [ './avatar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class W3sAvatarComponent implements OnChanges {
  /**
   * Sets provided image url as avatar otherwise default user icon will be shown. <br>
   * It's an optional parameter.
   */
  @Input()
  public src?: string;

  /**
   * Sets size of the avatar.
   * It's an optional parameter. <br>
   * The default value is 40.
   */
  @Input()
  public size?: number = 40;

  /** @internal */
  public iconStyleProperties: W3sSetStyleProp[] = [];

  /** @internal */
  public defaultUserIcon: W3sWlcIcon = W3S_WLC_ICON.USER;

  /** @internal */
  public defaultUserIconColor: string = AsColors[AS_COLOR_GROUP.WHITE].base;

  constructor() {
    this.setIconStylesProperty();
  }

  /** @internal */
  ngOnChanges(): void {
    this.setIconStylesProperty();
  }

  /** @internal */
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
        name: '--w3s-avatar-icon-size',
        value: `${this.size - (this.size / 3)}px`
      }
    )
  }
}
