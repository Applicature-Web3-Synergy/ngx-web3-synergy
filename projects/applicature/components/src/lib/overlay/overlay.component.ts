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
   * {@link customize} - It's an `@Input()` parameter.
   * You can customize overlay.
   * This is an optional parameter.
   */
  @Input() customize?: AucOverlayCustomizationConfig

  /**
   * {@link overlayClicked} - It's an `@Output()` parameter.
   * Emits when overlay was clicked.
   */
  @Output() overlayClicked: EventEmitter<void> = new EventEmitter<void>();

  public onOverlayClicked(): void {
    this.overlayClicked.emit();
  }
}
