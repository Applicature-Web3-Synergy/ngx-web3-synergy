import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import { AS_COLOR_GROUP, AsColorGroup, AsColorProperties, AsColors } from '@applicature/styles';

import { AucButtonAppearance } from './types';
import { AUC_BUTTON_APPEARANCE } from './enums';
import { AUC_IDENTICON_POSITION, AucIdenticonPosition, AucSetStyleProp } from '../directives';


@Component({
  selector: 'auc-button',
  templateUrl: './button.component.html',
  styleUrls: [ './button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AucButtonComponent implements OnInit, OnChanges {
  /**
   * Text for the button label. <br>
   * It's an optional parameter, required if {@link appearance} equals to {@link AUC_BUTTON_APPEARANCE.FLAT}.
   */
  @Input()
  public label?: string;

  /**
   * Sets borderRadius of the button. <br>
   * It's an optional parameter. <br>
   * The default value is 8.
   */
  @Input()
  public borderRadius?: number = 8;

  /**
   * Sets theme of the button. <br>
   * It's an optional parameter. <br>
   * The default value is blue. <br>
   * You can use enum {@link AS_COLOR_GROUP}.
   */
  @Input()
  public color?: AsColorGroup = AS_COLOR_GROUP.BLUE;

  /**
   * Whether the button is disabled. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public disabled?: boolean = false;

  /**
   * Whether the button is full width. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public adaptive?: boolean = false;

  /**
   * Sets height of the button. <br>
   * It's an optional parameter. <br>
   * The default value is 40.
   */
  @Input()
  public height?: number = 40;

  /**
   * Shows identicon if provided. <br>
   * It's an optional parameter.
   */
  @Input()
  public identicon?: HTMLDivElement;

  /**
   * Controls identicon position. <br>
   * It's an optional parameter. <br>
   * The default value is right. <br>
   * You can use enum {@link AUC_IDENTICON_POSITION}
   */
  @Input()
  public identiconPosition?: AucIdenticonPosition = AUC_IDENTICON_POSITION.RIGHT;

  /**
   * Shows left icon if provided. <br>
   * You can use supported icons from enum {@link AUC_WLC_ICON} or string. <br>
   * If you want to use custom icon, you need to provide url to the image as a string value. <br>
   * It's an optional parameter.
   */
  @Input()
  public leftIcon?: string;

  /**
   * Shows right icon if provided. <br>
   * You can use supported icons from enum {@link AUC_WLC_ICON} or string. <br>
   * If you want to use custom icon, you need to provide url to the image as a string value. <br>
   * It's an optional parameter.
   */
  @Input()
  public rightIcon?: string;

  /**
   * Sets button appearance. <br>
   * You can use enum {@link AUC_BUTTON_APPEARANCE}. <br>
   * It's an optional parameter. <br>
   * The default value is flat.
   */
  @Input()
  public appearance?: AucButtonAppearance = AUC_BUTTON_APPEARANCE.FLAT;

  /**
   * Whether the button is transparent. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public transparent?: boolean = false;

  /**
   * Whether the button is bordered. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public bordered?: boolean = false;

  /**
   * Whether the button shows spinner. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public pending?: boolean = false;

  /**
   * Standard HTMLButtonElement type. <br>
   * It's an optional parameter. <br>
   * The default value is button.
   */
  @Input()
  public type: 'button' | 'reset' | 'submit' = 'button';

  /**
   * Emits an action when button was clicked. <br>
   * Emitted value is native click value.
   */
  @Output()
  public buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  /** @internal */
  public styleProperties: AucSetStyleProp[] = [];

  /** @internal */
  public BUTTON_APPEARANCE = AUC_BUTTON_APPEARANCE;

  /** @internal */
  public get iconColor(): string {
    return this.color === AS_COLOR_GROUP.WHITE
      ? AsColors[AS_COLOR_GROUP.GRAY].base
      : AsColors[AS_COLOR_GROUP.WHITE].base
  }

  /** @internal */
  public get spinnerColor(): string {
    return this.color === AS_COLOR_GROUP.WHITE
      ? AsColors[AS_COLOR_GROUP.BLUE].base
      : AsColors[AS_COLOR_GROUP.WHITE].base
  }

  constructor(private _elRef: ElementRef) {}

  /** @internal */
  public get classNames(): { [el: string]: boolean } {
    return {
      ['auc-button']: true,
      [`auc-button-white`]: !this.transparent && !this.bordered && this.color === AS_COLOR_GROUP.WHITE,
      ['auc-button-disabled']: this.disabled,
      ['auc-button-adaptive']: this.adaptive,
      ['auc-button-transparent']: this.transparent && !this.bordered,
      ['auc-button-bordered']: this.bordered,
      [`auc-button-${this.appearance}`]: true,
    };
  }

  /** @internal */
  public ngOnInit(): void {
    this.setProperties();
  }

  /** @internal */
  public ngOnChanges(): void {
    this.setProperties();
  }

  /** Emit {@link buttonClicked} event. */
  public clicked(event: any): void {
    if (this.disabled) {
      return;
    }

    this.buttonClicked.emit(event);
  }

  /** @internal */
  private setProperties(): void {
    if (this.adaptive) {
      this._elRef.nativeElement.style.width = '100%';
    }

    if (this.transparent && this.color !== AS_COLOR_GROUP.WHITE) {
      this.color = AS_COLOR_GROUP.WHITE;
    }

    const colorProperties: AsColorProperties = AsColors[this.color || AS_COLOR_GROUP.BLUE];

    const colorProps: AucSetStyleProp[] = Object.keys(colorProperties || {})
      .map((prop: string) => {
        return {
          name: `--auc-button-${prop}`,
          value: colorProperties[prop]
        }
      });

    this.styleProperties = [
      {
        name: '--auc-button-radius',
        value: `${this.borderRadius}px`
      },
      ...(colorProps || [])
    ];
  }
}
