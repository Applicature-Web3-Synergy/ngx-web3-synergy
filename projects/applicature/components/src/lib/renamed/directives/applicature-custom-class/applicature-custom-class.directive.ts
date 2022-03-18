import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[applicatureCustomClass]',
  exportAs: 'applicatureCustomClass'
})
export class ApplicatureCustomClassDirective {
  @Input() applicatureCustomClass: string | string[];

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.setClasses([].concat(this.applicatureCustomClass ?? []));
  }

  public setClasses(classes: string[]): void {
    if (!classes?.length) {
      return;
    }

    classes.forEach((item: string) => {
      this._renderer2.addClass(this._elementRef.nativeElement, item);
    });
  }

  public removeClasses(classes: string[]): void {
    if (!classes?.length) {
      return;
    }

    classes.forEach((item: string) => {
      this._renderer2.removeClass(this._elementRef.nativeElement, item);
    });
  }
}
