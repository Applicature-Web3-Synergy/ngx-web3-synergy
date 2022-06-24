import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

import { AucIdenticonPosition } from './types';
import { AUC_IDENTICON_POSITION } from './enums';


@Directive({
  selector: '[aucIdenticon]',
  exportAs: 'aucIdenticon'
})
export class AucIdenticonDirective implements OnChanges {
  /**
   * Shows identicon if provided. <br>
   * It's an optional parameter.
   */
  @Input()
  public aucIdenticon?: HTMLDivElement;

  /**
   * Controls identicon position. <br>
   * You can use enum {@link AUC_IDENTICON_POSITION} <br>
   * It's an optional parameter. <br>
   * The default value is right;
   */
  @Input()
  public position?: AucIdenticonPosition = AUC_IDENTICON_POSITION.RIGHT;

  /** @internal */
  private identicon: HTMLDivElement;

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
  }

  /** @internal */
  ngOnChanges() {
    this.setIdenticon();
  }

  /** Sets {@link aucIdenticon}. */
  public setIdenticon(): void {
    if (this.identicon) {
      this._renderer2.removeChild(this._elementRef.nativeElement, this.identicon);
    }

    if (!this.aucIdenticon) {
      return;
    }

    this.identicon = this.aucIdenticon.cloneNode(true) as HTMLDivElement;
    this._renderer2.addClass(this.identicon, 'auc-identicon');

    if (!this.position) {
      this.position = AUC_IDENTICON_POSITION.RIGHT;
    }

    if (this.position !== AUC_IDENTICON_POSITION.RIGHT) {
      this._renderer2.setStyle(this.identicon, 'margin-right', '8px');
      this._renderer2.insertBefore(
        this._elementRef.nativeElement,
        this.identicon,
        this._elementRef.nativeElement.firstChild
      );

      return;
    }

    this._renderer2.setStyle(this.identicon, 'margin-left', '8px');
    this._renderer2.appendChild(this._elementRef.nativeElement, this.identicon);
  }

}
