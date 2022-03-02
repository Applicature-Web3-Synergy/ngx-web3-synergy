import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';


@Directive({
  selector: '[applicatureCustomClass]'
})
export class CustomClassDirective implements OnInit {
  @Input() applicatureCustomClass: string | string[];

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.setClasses([].concat(this.applicatureCustomClass ?? []));
  }

  public setClasses(classes: string[]): void {
    if (!classes.length) {
      return;
    }

    classes.forEach((item: string) => {
      this._renderer2.addClass(this._elementRef.nativeElement, item);
    });
  }

}
