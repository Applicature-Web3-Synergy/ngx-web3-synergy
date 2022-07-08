import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

import { W3sIdenticonPosition } from './types';
import { W3S_IDENTICON_POSITION } from './enums';


@Directive({
  selector: '[w3sIdenticon]',
  exportAs: 'w3sIdenticon'
})
export class W3sIdenticonDirective implements OnChanges {
  /**
   * Shows identicon if provided. <br>
   * It's an optional parameter.
   */
  @Input()
  public w3sIdenticon?: HTMLDivElement;

  /**
   * Controls identicon position. <br>
   * You can use enum {@link W3S_IDENTICON_POSITION} <br>
   * It's an optional parameter. <br>
   * The default value is right;
   */
  @Input()
  public position?: W3sIdenticonPosition = W3S_IDENTICON_POSITION.RIGHT;

  /** @internal */
  private identicon: HTMLDivElement;

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
  }

  /** @internal */
  ngOnChanges() {
    this.setIdenticon();
  }

  /** Sets {@link w3sIdenticon}. */
  public setIdenticon(): void {
    if (this.identicon) {
      this._renderer2.removeChild(this._elementRef.nativeElement, this.identicon);
    }

    if (!this.w3sIdenticon) {
      return;
    }

    this.identicon = this.w3sIdenticon.cloneNode(true) as HTMLDivElement;
    this._renderer2.addClass(this.identicon, 'w3s-identicon');

    if (!this.position) {
      this.position = W3S_IDENTICON_POSITION.RIGHT;
    }

    if (this.position !== W3S_IDENTICON_POSITION.RIGHT) {
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
