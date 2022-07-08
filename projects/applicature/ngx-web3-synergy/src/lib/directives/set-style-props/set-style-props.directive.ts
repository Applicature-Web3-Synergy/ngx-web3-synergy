import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { W3sSetStyleProp } from './interfaces';


@Directive({
  selector: '[w3sSetStyleProps]',
  exportAs: 'w3sSetStyleProps'
})
export class W3sSetStylePropsDirective implements OnChanges {
  /**
   * Used for setting style properties to the element. <br>
   * You can use set properties in your scss. <br>
   * Ex: w3sSetStyleProps = {name: '--text-color: 'red'}. <br>
   * In your scss file you can use it: color: var(--text-color).
   * It's required parameter.
   */
  @Input()
  public w3sSetStyleProps!: W3sSetStyleProp | W3sSetStyleProp[];

  constructor(private _elementRef: ElementRef) {
  }

  /** @internal */
  ngOnChanges(): void {
    this.setProperty([].concat(this.w3sSetStyleProps ?? []));
  }

  /** Sets property to nativeElement */
  public setProperty(props: W3sSetStyleProp[]): void {
    if (!Array.isArray(props) || !props.length || !this._elementRef?.nativeElement?.style) {
      return;
    }

    props.forEach((item: W3sSetStyleProp) => {
      if (!item.name || !item.value) {
        return
      }

      this._elementRef.nativeElement.style.setProperty(item.name, item.value);
    });
  }

}
