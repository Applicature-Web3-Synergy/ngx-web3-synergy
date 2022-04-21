import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[aucRipple]',
  exportAs: 'aucRipple'
})
export class AucRippleDirective {
  /**
   * Sets custom class to the ripple element. <br>
   * It's an optional parameter.
   */
  @Input()
  public customClass?: string;

  /** @internal */
  private readonly rippleClass = 'auc-ripple';

  /** @internal */
  @HostListener('mousedown', [ '$event' ]) onMousedown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.createRipple(e);
  }

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
    this.setStyle(this._elementRef.nativeElement, 'overflow', 'hidden');
    this.setStyle(this._elementRef.nativeElement, 'position', 'relative');
  }

  /** Sets style to HTMLElement */
  public setStyle(el: HTMLElement, style: string, value: string | number): void {
    if (!this._elementRef?.nativeElement || !style || (!value && value !== 0)) {
      return;
    }

    this._renderer2.setStyle(el, style, value);
  }

  /** @internal */
  private createRipple(event): void {
    const rippleIndex = [ ...this._elementRef.nativeElement.childNodes ]
      .findIndex(node => node.className === this.rippleClass);

    if (rippleIndex !== -1) {
      this._renderer2.removeChild(
        this._elementRef.nativeElement,
        this._elementRef.nativeElement.childNodes[rippleIndex]
      );
    }

    const button = this._elementRef.nativeElement;
    const circle: HTMLElement = this._renderer2.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const circleSize = `${diameter}px`;
    this._renderer2.setStyle(circle, 'width', circleSize);
    this._renderer2.setStyle(circle, 'height', circleSize);
    this._renderer2.setStyle(circle, 'left', `${event.offsetX - radius}px`);
    this._renderer2.setStyle(circle, 'top', `${event.offsetY - radius}px`);
    this._renderer2.addClass(circle, this.rippleClass);

    if ((this.customClass ?? '').trim()) {
      this._renderer2.addClass(circle, this.customClass.trim());
    }

    this._renderer2.appendChild(this._elementRef.nativeElement, circle);
  }

}
