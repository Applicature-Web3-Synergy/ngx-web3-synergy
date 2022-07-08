import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

import { W3sOverlayCustomizationConfig } from './interfaces';


@Component({
  selector: 'w3s-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: [ './overlay.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sOverlayComponent {
  /**
   * You can customize overlay. <br>
   * It's an optional parameter.
   */
  @Input()
  public customize?: W3sOverlayCustomizationConfig

  /** Emits when overlay was clicked. */
  @Output()
  public overlayClicked: EventEmitter<void> = new EventEmitter<void>();

  /** Emit {@link overlayClicked} event. */
  public onOverlayClicked(): void {
    this.overlayClicked.emit();
  }
}
