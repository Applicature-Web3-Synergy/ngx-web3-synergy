import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { AucSetStyleProp } from './interfaces';


@Directive({
  selector: '[aucSetStyleProps]',
  exportAs: 'aucSetStyleProps'
})
export class AucSetStylePropsDirective implements OnChanges {
  /**
   * {@link aucSetStyleProps} - It's an `@Input()` parameter.
   * Used for setting style properties to the element.
   * You can use set properties in your scss.
   * Ex: aucSetStyleProps = {name: '--text-color: 'red'}.
   * In your scss file you can use it: color: var(--text-color);
   */
  @Input()
  public aucSetStyleProps!: AucSetStyleProp | AucSetStyleProp[];

  constructor(private _elementRef: ElementRef) {
  }

  ngOnChanges(): void {
    this.setProperty([].concat(this.aucSetStyleProps ?? []));
  }

  public setProperty(props: AucSetStyleProp[]): void {
    if (!Array.isArray(props) || !props.length || !this._elementRef?.nativeElement?.style) {
      return;
    }

    props.forEach((item: AucSetStyleProp) => {
      if (!item.name || !item.value) {
        return
      }

      this._elementRef.nativeElement.style.setProperty(item.name, item.value);
    });
  }

}
