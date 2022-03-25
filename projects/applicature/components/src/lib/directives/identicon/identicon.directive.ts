import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

import { AucIdenticonPosition } from './types';
import { AUC_IDENTICON_POSITION } from './enums';


@Directive({
  selector: '[aucIdenticon]',
  exportAs: 'aucIdenticon'
})
export class AucIdenticonDirective implements OnChanges {
  /**
   * {@link aucIdenticon} - It's an `@Input()` parameter.
   * Shows identicon if provided.
   * It's an optional parameter.
   */
  @Input()
  public aucIdenticon: HTMLDivElement;

  /**
   * {@link position} - It's an `@Input()` parameter.
   * Controls identicon position.
   * It's an optional parameter. The default value is right;
   * You can use enum {@link AUC_IDENTICON_POSITION}
   */
  @Input()
  public position: AucIdenticonPosition = AUC_IDENTICON_POSITION.RIGHT;

  private identicon: HTMLDivElement;

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
  }

  ngOnChanges() {
    this.setIdenticon();
  }

  public setIdenticon(): void {
    if (!this.aucIdenticon) {
      return;
    }

    if (this.identicon) {
      this._renderer2.removeChild(this._elementRef.nativeElement, this.identicon);
    }

    this.identicon = this.aucIdenticon.cloneNode(true) as HTMLDivElement;
    this._renderer2.addClass(this.identicon, 'auc-identicon');

    if (!this.position) {
      this.position = AUC_IDENTICON_POSITION.RIGHT;
    }

    if (this.position !== AUC_IDENTICON_POSITION.RIGHT) {
      this._renderer2.setStyle(this.identicon, 'margin-right', '8px');
      this._renderer2.insertBefore(this._elementRef.nativeElement, this.identicon, this._elementRef.nativeElement.firstChild);

      return;
    }

    this._renderer2.setStyle(this.identicon, 'margin-left', '8px');
    this._renderer2.appendChild(this._elementRef.nativeElement, this.identicon);
  }

}
