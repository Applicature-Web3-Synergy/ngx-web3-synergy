import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

import { APPLICATURE_COLORS, AS_COLOR_GROUP, AsColorGroup, ColorProperties } from '@applicature/styles';

import { AucButtonAppearance } from './types';
import { AUC_BUTTON_APPEARANCE } from './enums';
import { AUC_IDENTICON_POSITION, AucIdenticonPosition } from '../../directives';


@Component({
  selector: 'auc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AucButtonComponent implements OnInit, OnChanges {
  /**
   * {@link label} Text for the button label.
   * It's required parameter.
   */
  @Input()
  public label!: string;

  /**
   * {@link borderRadius} Sets borderRadius of the button.
   * It's an optional parameter. The default value is 8.
   */
  @Input()
  public borderRadius: number = 8;

  /**
   * {@link color} Sets theme of the button.
   * It's an optional parameter. The default value is blue.
   * You can use enum {@link AS_COLOR_GROUP}.
   */
  @Input()
  public color: AsColorGroup = AS_COLOR_GROUP.BLUE;

  /**
   * {@link disabled} Whether the button is disabled.
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public disabled: boolean = false;

  /**
   * {@link adaptive} Whether the button is full width.
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public adaptive: boolean = false;

  /**
   * {@link height} Sets height of the button.
   * It's an optional parameter. The default value is 40.
   */
  @Input()
  public height: number = 40;

  /**
   * {@link identicon} Shows identicon if provided.
   * It's an optional parameter.
   */
  @Input()
  public identicon: HTMLDivElement;

  /**
   * {@link identiconPosition} Controls identicon position.
   * It's an optional parameter. The default value is right;
   * You can use enum ${@link AUC_IDENTICON_POSITION}
   */
  @Input()
  public identiconPosition: AucIdenticonPosition = AUC_IDENTICON_POSITION.RIGHT;

  /**
   * {@link leftIcon} Shows left icon if provided.
   * You can use supported icons from enum {@link AUC_WLC_ICON} or string;
   * If you want to use custom icon you need to provide url to the image as a string value.
   * It's an optional parameter.
   */
  /**
   * @param value type uses enum {@link AUC_WLC_ICON} or string;
   * @param value as string should use the url to the image.
   */
  @Input()
  public leftIcon: string;

  /**
   * {@link rightIcon} Shows right icon if provided.
   * You can use supported icons from enum {@link AUC_WLC_ICON} or string;
   * If you want to use custom icon you need to provide url to the image as a string value.
   * It's an optional parameter.
   */
  @Input()
  public rightIcon: string;

  /**
   * {@link appearance}
   * It's an optional parameter. The default value is flat.
   * You can use enum {@link AUC_BUTTON_APPEARANCE}.
   */
  @Input()
  public appearance: AucButtonAppearance = AUC_BUTTON_APPEARANCE.FLAT;

  /**
   * {@link transparent} Whether the button is transparent.
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public transparent: boolean = false;

  /**
   * {@link pending} Whether the button shows spinner.
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public pending: boolean = false;

  /**
   * {@link type} Standard HTMLButtonElement type {@link HTMLButtonElement.type}: 'button' | 'reset' | 'submit'.
   * It's an optional parameter. The default value is button.
   */
  @Input()
  public type: 'button' | 'reset' | 'submit' = 'button';

  /**
   * {@link onClickEmitter} Emits an action when button was clicked.
   * Emitted value is native click value.
   */
  @Output('onClick')
  public onClickEmitter: EventEmitter<any> = new EventEmitter<any>();

  public BUTTON_APPEARANCE = AUC_BUTTON_APPEARANCE;

  public get classNames(): { [el: string]: boolean } {
    return {
      ['auc-button']: true,
      [`auc-button-white`]: this.color === AS_COLOR_GROUP.WHITE,
      ['auc-button-disabled']: this.disabled,
      ['auc-button-adaptive']: this.adaptive,
      ['auc-button-transparent']: this.transparent,
      [`auc-button-${this.appearance}`]: true,
    };
  }

  @ViewChild('buttonRef', { static: true })
  private _buttonRef!: ElementRef<HTMLButtonElement>;

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnChanges(): void {
    const colorProperties = APPLICATURE_COLORS[this.color || AS_COLOR_GROUP.BLUE] as ColorProperties;
    const style = this._buttonRef.nativeElement.style;

    Object.keys(colorProperties).forEach((prop) => {
      style.setProperty(`--auc-button-${prop}`, (colorProperties as any)[prop]);
    });

    style.setProperty(`--auc-button-radius`, `${this.borderRadius}px`);
  }

  public onClick(event: any): void {
    if (this.disabled) {
      return;
    }

    this.onClickEmitter.emit(event);
  }
}
