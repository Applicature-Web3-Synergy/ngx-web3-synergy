import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { AS_COLOR_GROUP, AsColorGroup, AsColors } from '@applicature/styles';

import { W3sSetStyleProp } from '../directives';
import { W3sAlertPosition } from './types';
import { W3S_ALERT_POSITION } from './enums';


@Component({
  selector: 'w3s-alert',
  templateUrl: './alert.component.html',
  styleUrls: [ './alert.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class W3sAlertComponent implements OnInit, OnChanges {
  /**
   * The message to show in the alert. <br>
   * It's required parameter. <br>
   */
  @Input()
  public text!: string;

  /**
   * Sets Alert icon. <br>
   * Supported icons from enum {@link W3S_WLC_ICON} or string. <br>
   * If you want to use custom icon, you need to provide url to the image as a string value. <br>
   * It's an optional parameter.
   */
  @Input()
  public icon?: string;

  /**
   * Controls icon position. <br>
   * You can use enum {@link W3S_ALERT_POSITION}. <br>
   * It's an optional parameter. <br>
   * The default value left.
   */
  @Input()
  public iconPosition?: W3sAlertPosition = W3S_ALERT_POSITION.LEFT;

  /**
   * Theme color palette for the alert. Sets the alert background color. <br>
   * It's an optional parameter. <br>
   * The default value is red.
   */
  @Input()
  public color: AsColorGroup = AS_COLOR_GROUP.RED;

  /** @internal */
  public styleProperties: W3sSetStyleProp[] = [];

  /** @internal */
  public get classNames(): { [el: string]: boolean } {
    return {
      ['w3s-alert']: true,
      [`w3s-alert-white`]: this.color === 'white',
      [`w3s-alert-icon-${this.iconPosition}`]: true,
    };
  }

  /** @internal */
  public ngOnInit(): void {
    this.ngOnChanges();
  }

  /** @internal */
  public ngOnChanges(): void {
    const { base, text } = AsColors[this.color];

    this.styleProperties = [
      {
        name: '--w3s-alert-text',
        value: text
      },
      {
        name: '--w3s-alert-background',
        value: base
      }
    ];
  }
}
