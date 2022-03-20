import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { AS_COLOR_GROUP, AsColors } from '@applicature/styles';


@Component({
  selector: 'auc-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [ './spinner.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucSpinnerComponent {
  /**
   * {@link diameter} - It's an `@Input()` parameter.
   * Sets diameter for the spinner.
   * This is an optional parameter. The default value is 40.
   */
  @Input() diameter?: number = 40;

  /**
   * {@link width} - It's an `@Input()` parameter.
   * Вets the thickness of the spinnerю
   * This is an optional parameter. The default value is 4.
   */
  @Input() width?: number = 4;

  /**
   * {@link color} - It's an `@Input()` parameter.
   * Sets theme of the spinner.
   * It's an optional parameter. The default value is #4678F0 - blue.
   * You can use constant {@link AsColors} or use other colors by yourself.
   */
  @Input() color?: string = AsColors[AS_COLOR_GROUP.BLUE].border;

  public parts = Array.from({ length: 4 }, () => undefined);
}
