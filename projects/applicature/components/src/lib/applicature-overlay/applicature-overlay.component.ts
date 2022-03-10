import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

import { ApplicatureOverlayCustomizationConfig } from './interfaces';


@Component({
  selector: 'applicature-overlay',
  templateUrl: './applicature-overlay.component.html',
  styleUrls: [ './applicature-overlay.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicatureOverlayComponent {
  @Input() customize?: ApplicatureOverlayCustomizationConfig
  @Output() overlayClicked: EventEmitter<void> = new EventEmitter<void>();

  public onOverlayClicked(): void {
    this.overlayClicked.emit();
  }
}
