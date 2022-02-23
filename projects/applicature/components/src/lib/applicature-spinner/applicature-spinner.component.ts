import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { APPLICATURE_COLORS } from '@applicature/styles';

@Component({
  selector: 'applicature-spinner',
  templateUrl: './applicature-spinner.component.html',
  styleUrls: ['./applicature-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicatureSpinnerComponent {
  @Input() diameter?: number = 40;
  @Input() width?: number = 4;
  @Input() color?: string = APPLICATURE_COLORS['blue'].border;

  public parts = Array.from({ length: 4 }, () => undefined);
}
