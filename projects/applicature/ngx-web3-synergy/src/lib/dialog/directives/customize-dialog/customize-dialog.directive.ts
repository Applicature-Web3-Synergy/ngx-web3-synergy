import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS } from '../../enums';
import { W3sCustomizeDialogConfig } from '../../interfaces';


/**
 * Uses for customization dialog window by config.
 */
@Directive({
  selector: '[w3sCustomizeDialog]',
  exportAs: 'w3sCustomizeDialog'
})
export class W3sCustomizeDialogDirective implements OnInit {
  /** Configuration data for customization dialog. */
  @Input()
  public config?: W3sCustomizeDialogConfig;

  /** @internal */
  private get isConfig(): boolean {
    return !!(Object.keys(this.config ?? {})).length;
  }

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
  }

  /** @internal */
  ngOnInit(): void {
    this.mapConfig();
  }

  /** Sets classes to the nativeElement */
  public setClasses(classes: string[]): void {
    if (!classes.length) {
      return;
    }

    classes.forEach((item: string) => {
      this._renderer2.addClass(this._elementRef.nativeElement, item);
    });
  }

  /** Sets css styles to the nativeElement */
  public setStyle(style: string, value: string | number): void {
    if (!this._elementRef?.nativeElement || !style || (!value && value !== 0)) {
      return;
    }

    this._renderer2.setStyle(this._elementRef.nativeElement, style, value);
  }

  /** @internal */
  public mapConfig(): void {
    if (!this.isConfig) {
      return;
    }

    Object.keys(this.config).forEach((key: string) => {
      if (key === W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.CLASSES) {
        this.setClasses([].concat(this.config[key]));

        return;
      }

      if (key === W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.WIDTH) {
        this.setStyle('width', this.config[key]);

        return;
      }

      if (key === W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.HEIGHT) {
        this.setStyle('height', this.config[key]);

        return;
      }

      if (key === W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.MIN_WIDTH) {
        this.setStyle('min-width', this.config[key]);

        return;
      }

      if (key === W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.MIN_HEIGHT) {
        this.setStyle('min-height', this.config[key]);

        return;
      }

      if (key === W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.MAX_WIDTH) {
        this.setStyle('max-width', this.config[key]);

        return;
      }

      if (key === W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.MAX_HEIGHT) {
        this.setStyle('max-height', this.config[key]);

        return;
      }

      if (key === W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.POSITION) {
        this.setClasses([].concat(this.config[key]));

        return;
      }
    });
  }

}
