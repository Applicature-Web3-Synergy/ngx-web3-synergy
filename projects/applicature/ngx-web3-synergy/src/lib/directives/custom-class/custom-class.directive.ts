import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';


@Directive({
  selector: '[w3sCustomClass]',
  exportAs: 'w3sCustomClass'
})
export class W3sCustomClassDirective implements OnInit {
  /**
   * Sets class / list of classes to the elements.
   */
  @Input()
  public w3sCustomClass: string | string[];

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
  }

  /** @internal */
  ngOnInit(): void {
    this.setClasses([].concat(this.w3sCustomClass ?? []));
  }

  /** Sets classes to the nativeElement */
  public setClasses(classes: string[]): void {
    if (!classes?.length) {
      return;
    }

    classes.forEach((item: string) => {
      this._renderer2.addClass(this._elementRef.nativeElement, item);
    });
  }

  /** Remove classes from the nativeElement */
  public removeClasses(classes: string[]): void {
    if (!classes?.length) {
      return;
    }

    classes.forEach((item: string) => {
      this._renderer2.removeClass(this._elementRef.nativeElement, item);
    });
  }
}
