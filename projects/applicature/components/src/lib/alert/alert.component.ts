import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { AS_COLOR_GROUP, AsColorGroup, AsColors } from '@applicature/styles';

import { AucSetStyleProp } from '../directives';
import { AucAlertPosition } from './types';
import { AUC_ALERT_POSITION } from './enums';


@Component({
  selector: 'auc-alert',
  templateUrl: './alert.component.html',
  styleUrls: [ './alert.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AucAlertComponent implements OnInit, OnChanges {
  /**
   * The message to show in the alert. <br>
   * It's required parameter. <br>
   */
  @Input()
  public text!: string;

  /**
   * Sets Alert icon. <br>
   * Supported icons from enum {@link AUC_WLC_ICON} or string. <br>
   * If you want to use custom icon, you need to provide url to the image as a string value. <br>
   * It's an optional parameter.
   */
  @Input()
  public icon?: string;

  /**
   * Controls icon position. <br>
   * You can use enum {@link AUC_ALERT_POSITION}. <br>
   * It's an optional parameter. <br>
   * The default value left.
   */
  @Input()
  public iconPosition?: AucAlertPosition = AUC_ALERT_POSITION.LEFT;

  /**
   * Theme color palette for the alert. Sets the alert background color. <br>
   * It's an optional parameter. <br>
   * The default value is red.
   */
  @Input()
  public color: AsColorGroup = AS_COLOR_GROUP.RED;

  /** @internal */
  public styleProperties: AucSetStyleProp[] = [];

  /** @internal */
  public get classNames(): { [el: string]: boolean } {
    return {
      ['auc-alert']: true,
      [`auc-alert-white`]: this.color === 'white',
      [`auc-alert-icon-${this.iconPosition}`]: true,
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
        name: '--auc-alert-text',
        value: text
      },
      {
        name: '--auc-alert-background',
        value: base
      }
    ];
  }
}
