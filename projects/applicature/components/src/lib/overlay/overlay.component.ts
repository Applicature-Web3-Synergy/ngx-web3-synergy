import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

import { AucOverlayCustomizationConfig } from './interfaces';


@Component({
  selector: 'auc-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: [ './overlay.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucOverlayComponent {
  /**
   * You can customize overlay. <br>
   * It's an optional parameter.
   */
  @Input()
  public customize?: AucOverlayCustomizationConfig

  /** Emits when overlay was clicked. */
  @Output()
  public overlayClicked: EventEmitter<void> = new EventEmitter<void>();

  /** Emit {@link overlayClicked} event. */
  public onOverlayClicked(): void {
    this.overlayClicked.emit();
  }
}
