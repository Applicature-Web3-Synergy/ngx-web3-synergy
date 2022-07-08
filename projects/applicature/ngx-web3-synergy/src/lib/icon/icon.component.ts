import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { W3sWlcIcon } from './types';

enum W3S_ICON_APPEARANCE {
  URL = 'url',
  ICON = 'icon',
  SVG = 'svg'
}


@Component({
  selector: 'w3s-icon',
  templateUrl: './icon.component.html',
  styleUrls: [ './icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sIconComponent implements OnChanges {
  /**
   * Sets css style color. <br>
   * It's an optional parameter.
   */
  @Input()
  public color?: string;

  /**
   * Sets icon. <br>
   * Use enum {@link W3S_WLC_ICON} or other string. <br>
   * If you want to use custom icon, you need to provide url to the image as a string value. <br>
   * Value can be as svg. <br>
   * It's required parameter.
   */
  @Input()
  public icon!: W3sWlcIcon;

  /** @internal */
  public appearance: W3S_ICON_APPEARANCE;

  /** @internal */
  public ICON_APPEARANCE = W3S_ICON_APPEARANCE;

  /** @internal */
  public get sanitizedSVG(): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(this.icon);
  }

  /** @internal */
  public get _isSvg(): boolean {
    return (this.icon || '').includes('<svg');
  }

  /** @internal */
  private get _isImage(): boolean {
    return !this.icon ? false : (/.+\..+$/i).test(this.icon);
  }

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.icon && this.icon) {
      if (this._isSvg) {
        this.appearance = W3S_ICON_APPEARANCE.SVG;
      } else {
        this.appearance = this._isImage ? W3S_ICON_APPEARANCE.URL : W3S_ICON_APPEARANCE.ICON;
      }
    }
  }
}
