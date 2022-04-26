import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[aucCustomClass]',
  exportAs: 'aucCustomClass'
})
export class AucCustomClassDirective {
  /**
   * Sets class / list of classes to the elements.
   */
  @Input()
  public aucCustomClass: string | string[];

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
  }

  /** @internal */
  ngOnInit(): void {
    this.setClasses([].concat(this.aucCustomClass ?? []));
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
