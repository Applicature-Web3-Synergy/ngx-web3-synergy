import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  ElementRef,
  ViewChild,
  Input,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { aucToBN } from '../helpers';


export const INPUT_FIELD_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AucInputComponent),
  multi: true,
};


@Component({
  selector: 'auc-input',
  templateUrl: './input.component.html',
  styleUrls: [ './input.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ INPUT_FIELD_VALUE_ACCESSOR ],
})
export class AucInputComponent implements ControlValueAccessor, OnChanges, OnInit {
  /**
   * Text for the form field label. <br>
   * It's an optional parameter.
   */
  @Input()
  public label?: string;

  /**
   * Text for the form field placeholder. <br>
   * It's an optional parameter.
   */
  @Input()
  public placeholder?: string = '';

  /**
   * Whether the control is disabled. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public disabled?: boolean = false;

  /**
   * Sets height of form field. <br>
   * It's an optional parameter. <br>
   * The default value is 48.
   */
  @Input()
  public height?: number = 48;

  /**
   * Whether the form field is full width. <br>
   * It's an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public adaptive?: boolean = false;

  /**
   * Text for the form field prefix. <br>
   * It's an optional parameter.
   */
  @Input()
  public prefix?: string;

  /**
   * Text for the form field suffix. <br>
   * It's an optional parameter.
   */
  @Input()
  public suffix?: string;

  /**
   * Sets Input field type. <br>
   * It's an optional parameter. <br>
   * The default value is text.
   */
  @Input()
  public type?: 'text' | 'number' = 'text';

  /**
   * Allows to input number with decimal point. <br>
   * If true - ignore non decimals symbols. <br>
   * The default value is true.
   */
  @Input()
  public decimal?: boolean = true;

  /**
   * Sets max boundaries. <br>
   * It's an optional parameter.
   */
  @Input()
  public max?: number;

  /**
   * Sets hint for form field. <br>
   * It's an optional parameter.
   */
  @Input()
  public hint?: string;

  /**
   * List of provided errors. <br>
   * It's an optional parameter.
   */
  @Input()
  public errors?: string[];

  /** Field ElementRef. */
  @ViewChild('inputElement', { static: true })
  public inputElement!: ElementRef<HTMLInputElement>;

  /** @internal*/
  public value!: string;

  /** @internal*/
  public focus: boolean = false;

  /** @internal*/
  public get classNames(): { [el: string]: boolean } {
    return {
      ['auc-input-container']: true,
      ['auc-input-container-prefix']: !!this.prefix,
      ['auc-input-container-suffix']: !!this.suffix,
      ['auc-input-container-disabled']: this.disabled,
      ['auc-input-container-focus']: this.focus,
      ['auc-input-container-error']: this.errors?.length > 0,
    };
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
  }

  /** @internal*/
  public ngOnInit(): void {
    this.setElStyles();
  }

  /** @internal*/
  public ngOnChanges(changes?: SimpleChanges): void {
   if (changes.adaptive && !changes.adaptive?.firstChange) {
     this.setElStyles();
    }
  }

  /** Emit field value changes when clicked on Max. */
  public onMaxClick(): void {
    if (this.disabled || !this.max) {
      return;
    }

    this.onChange(String(this.max));
  }

  /** Change Input value. */
  public onChange(value: string): void {
    this.value = String(aucToBN(value).gt(this.max) ? this.max : value);

    if (this.inputElement?.nativeElement) {
      const inputElement = this.inputElement.nativeElement;
      inputElement.value = this.value || '';
    }

    this._onChange(this.value);
  }

  /** Register Field OnChange function. */
  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  /** Register Field OnTouched function. */
  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  /** Disable Input. */
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** @internal*/
  public writeValue(value: string): void {
    this.value = value || '';
    this._cdr.markForCheck();
  }

  /** @internal*/
  private _onChange: (value: string) => void = () => {
  };

  /** @internal*/
  private _onTouched: () => void = () => {
  };

  /** @internal*/
  private setElStyles(): void {
    const element = this._elementRef.nativeElement;

    element.style.display = this.adaptive ? 'block' : 'inline-flex'
  }
}
