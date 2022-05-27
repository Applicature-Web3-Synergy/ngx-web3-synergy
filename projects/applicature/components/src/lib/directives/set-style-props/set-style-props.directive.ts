import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { AucSetStyleProp } from './interfaces';


@Directive({
  selector: '[aucSetStyleProps]',
  exportAs: 'aucSetStyleProps'
})
export class AucSetStylePropsDirective implements OnChanges {
  /**
   * Used for setting style properties to the element. <br>
   * You can use set properties in your scss. <br>
   * Ex: aucSetStyleProps = {name: '--text-color: 'red'}. <br>
   * In your scss file you can use it: color: var(--text-color).
   * It's required parameter.
   */
  @Input()
  public aucSetStyleProps!: AucSetStyleProp | AucSetStyleProp[];

  constructor(private _elementRef: ElementRef) {
  }

  /** @internal */
  ngOnChanges(): void {
    this.setProperty([].concat(this.aucSetStyleProps ?? []));
  }

  /** Sets property to nativeElement */
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
