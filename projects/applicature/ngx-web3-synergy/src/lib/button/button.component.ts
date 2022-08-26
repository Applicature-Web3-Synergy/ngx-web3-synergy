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

import { W3sButtonAppearance } from './types';
import { W3S_BUTTON_APPEARANCE } from './enums';
import { W3S_IDENTICON_POSITION, W3sIdenticonPosition, W3sSetStyleProp } from '../directives';


@Component({
  selector: 'w3s-button',
  templateUrl: './button.component.html',
  styleUrls: [ './button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class W3sButtonComponent implements OnInit, OnChanges {
  /**
   * Text for the button label. <br>
   * It's an optional parameter, required if {@link appearance} equals to {@link W3S_BUTTON_APPEARANCE.FLAT}.
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
   * You can use enum {@link W3S_IDENTICON_POSITION}
   */
  @Input()
  public identiconPosition?: W3sIdenticonPosition = W3S_IDENTICON_POSITION.RIGHT;

  /**
   * Shows left icon if provided. <br>
   * You can use supported icons from enum {@link W3S_WLC_ICON} or string. <br>
   * If you want to use custom icon, you need to provide url to the image as a string value. <br>
   * It's an optional parameter.
   */
  @Input()
  public leftIcon?: string;

  /**
   * Shows right icon if provided. <br>
   * You can use supported icons from enum {@link W3S_WLC_ICON} or string. <br>
   * If you want to use custom icon, you need to provide url to the image as a string value. <br>
   * It's an optional parameter.
   */
  @Input()
  public rightIcon?: string;

  /**
   * Sets button appearance. <br>
   * You can use enum {@link W3S_BUTTON_APPEARANCE}. <br>
   * It's an optional parameter. <br>
   * The default value is flat.
   */
  @Input()
  public appearance?: W3sButtonAppearance = W3S_BUTTON_APPEARANCE.FLAT;

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
  public buttonClicked: EventEmitter<any> = new EventEmitter<any>();  // eslint-disable-line @typescript-eslint/no-explicit-any

  /** @internal */
  public styleProperties: W3sSetStyleProp[] = [];

  /** @internal */
  public BUTTON_APPEARANCE = W3S_BUTTON_APPEARANCE;

  /** @internal */
  public get iconColor(): string {
    return this.disabled
      ? 'inherit'
      : this.color === AS_COLOR_GROUP.WHITE
        ? AsColors[AS_COLOR_GROUP.GRAY].base
        : AsColors[AS_COLOR_GROUP.WHITE].base;
  }

  /** @internal */
  public get spinnerColor(): string {
    return this.color === AS_COLOR_GROUP.WHITE
      ? AsColors[AS_COLOR_GROUP.BLUE].base
      : AsColors[AS_COLOR_GROUP.WHITE].base;
  }

  constructor(private _elRef: ElementRef) {
  }

  /** @internal */
  public get classNames(): { [el: string]: boolean } {
    return {
      ['w3s-button']: true,
      [`w3s-button-white`]: !this.transparent && !this.bordered && this.color === AS_COLOR_GROUP.WHITE,
      ['w3s-button-disabled']: this.disabled,
      ['w3s-button-adaptive']: this.adaptive,
      ['w3s-button-transparent']: this.transparent && !this.bordered,
      ['w3s-button-bordered']: this.bordered,
      ['w3s-button-with-left-icon']: !!(this.leftIcon && this.appearance !== W3S_BUTTON_APPEARANCE.ICON),
      ['w3s-button-with-right-icon']: !!(this.rightIcon && !this.pending
        && this.appearance !== W3S_BUTTON_APPEARANCE.ICON),
      ['w3s-button-with-spinner']: this.pending,
      ['w3s-button-with-left-identicon']: !!(this.identicon && this.identiconPosition === W3S_IDENTICON_POSITION.LEFT),
      ['w3s-button-with-right-identicon']: !!(this.identicon && this.identiconPosition !== W3S_IDENTICON_POSITION.LEFT),
      [`w3s-button-${this.appearance}`]: true,
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
  public clicked(event: any): void {  // eslint-disable-line @typescript-eslint/no-explicit-any
    if ( this.disabled ) {
      return;
    }

    this.buttonClicked.emit(event);
  }

  /** @internal */
  private setProperties(): void {
    if ( this.adaptive ) {
      this._elRef.nativeElement.style.width = '100%';  // eslint-disable-line @typescript-eslint/no-unsafe-member-access
    }

    if ( this.transparent && this.color !== AS_COLOR_GROUP.WHITE ) {
      this.color = AS_COLOR_GROUP.WHITE;
    }

    const colorProperties: AsColorProperties = AsColors[this.color || AS_COLOR_GROUP.BLUE];

    const colorProps: W3sSetStyleProp[] = Object.keys(colorProperties || {})
      .map((prop: string) => {
        return {
          name: `--w3s-button-${prop}`,
          value: colorProperties[prop]
        };
      });

    this.styleProperties = [
      {
        name: '--w3s-button-radius',
        value: `${this.borderRadius}px`
      },
      ...(colorProps || [])
    ];
  }
}
