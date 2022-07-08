import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { AS_COLOR_GROUP, AsColors } from '@applicature/styles';


@Component({
  selector: 'w3s-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [ './spinner.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3SpinnerComponent {
  /**
   * Sets diameter for the spinner. <br>
   * It's an optional parameter. <br>
   * The default value is 40.
   */
  @Input()
  public diameter?: number = 40;

  /**
   * Sets the thickness of the spinner. <br>
   * It's an optional parameter. <br>
   * The default value is 4.
   */
  @Input()
  public width?: number = 4;

  /**
   * Sets theme of the spinner. <br>
   * It's an optional parameter. <br>
   * The default value is #4678F0 - blue. <br>
   * You can use constant {@link AsColors} or use other colors by yourself.
   */
  @Input()
  public color?: string = AsColors[AS_COLOR_GROUP.BLUE].border;

  /** @internal */
  public parts = Array.from({ length: 4 }, () => undefined);
}
