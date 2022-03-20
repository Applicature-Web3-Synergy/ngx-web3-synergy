import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { AsColors } from '@applicature/styles';


@Component({
  selector: 'auc-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [ './spinner.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucSpinnerComponent {
  @Input() diameter?: number = 40;
  @Input() width?: number = 4;
  @Input() color?: string = AsColors['blue'].border;

  public parts = Array.from({ length: 4 }, () => undefined);
}
