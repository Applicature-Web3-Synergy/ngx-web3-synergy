import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { AS_COLOR_GROUP, AsColorGroup, AsColorProperties, AsColors } from '@applicature/styles';

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
   * @link text The message to show in the alert.
   * This is required parameter.
   */
  @Input()
  public text!: string;

  /**
   * @link icon This sets the alert icon otherwise it’ll be hidden.
   * You can use supported icons from enum {@link AUC_WLC_ICON} or string;
   * If you want to use custom icon you need to provide url to the image as a string value.
   * It's an optional parameter.
   * This is required parameter.
   */
  @Input()
  public icon!: string;

  /**
   * {@link iconPosition} Controls icon position.
   * It's an optional parameter. The default value is right;
   * You can use enum ${@link AUC_ALERT_POSITION}
   */
  @Input()
  public iconPosition: AucAlertPosition = AUC_ALERT_POSITION.LEFT;

  /**
   * @link color Theme color palette for the alert. This sets the alert background color.
   * It's an optional parameter. The default value is red.
   */
  @Input()
  public color: AsColorGroup = AS_COLOR_GROUP.RED;

  public styleProperties: AucSetStyleProp[] = [];

  public get classNames(): { [el: string]: boolean } {
    return {
      ['auc-alert']: true,
      [`auc-alert-white`]: this.color === 'white',
      [`auc-alert-icon-${this.iconPosition}`]: true,
    };
  }

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnChanges(): void {
    const { base, text } = AsColors[this.color] as AsColorProperties;

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
