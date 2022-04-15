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
   * {@link label} - It's an `@Input()` parameter.
   * Text for the form field label.
   * It's required parameter.
   */
  @Input()
  public label!: string;

  /**
   * {@link placeholder} - It's an `@Input()` parameter.
   * Text for the form field placeholder.
   * It's an optional parameter.
   */
  @Input()
  public placeholder: string = '';

  /**
   * {@link disabled} - It's an `@Input()` parameter.
   * Whether the control is disabled.
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public disabled: boolean = false;

  /**
   * {@link height} - It's an `@Input()` parameter.
   * Sets height of form field.
   * It's an optional parameter. The default value is 48.
   */
  @Input()
  public height: number = 48;

  /**
   * {@link adaptive} - It's an `@Input()` parameter.
   * Whether the form field is full width.
   * It's an optional parameter. The default value is false.
   */
  @Input()
  public adaptive: boolean = false;

  /**
   * {@link prefix} - It's an `@Input()` parameter.
   * Text for the form field prefix.
   * It's an optional parameter.
   */
  @Input()
  public prefix: string;

  /**
   * {@link suffix} - It's an `@Input()` parameter.
   * Text for the form field suffix.
   * It's an optional parameter.
   */
  @Input()
  public suffix: string;

  /** Sets Input field type */
  @Input()
  public type: 'string' | 'number' = 'string';

  /**
   * {@link decimal} - It's an `@Input()` parameter.
   * Allows to input number with decimal point
   * {@link decimal} = true - ignore non decimal symbols.
   * This is an optional parameter. The default value is true.
   */
  @Input()
  public decimal: boolean = true;

  /**
   * {@link max} - It's an `@Input()` parameter.
   * Sets max boundaries.
   * It's an optional parameter.
   */
  @Input()
  public max: number;

  /**
   * {@link hint} - It's an `@Input()` parameter.
   * Sets hint for form field.
   * It's an optional parameter.
   */
  @Input()
  public hint!: string;

  /**
   * {@link errors} - It's an `@Input()` parameter.
   * List of provided errors.
   * It's an optional parameter.
   */
  @Input()
  public errors: string[];

  @ViewChild('inputElement', { static: true })
  public inputElement!: ElementRef<HTMLInputElement>;

  public value!: string;
  public focus: boolean = false;

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

  public ngOnInit(): void {
    this.setElStyles();
  }

  public ngOnChanges(changes?: SimpleChanges): void {
   if (changes.adaptive && !changes.adaptive?.firstChange) {
     this.setElStyles();
    }
  }

  public onMaxClick(): void {
    if (this.disabled || !this.max) {
      return;
    }

    this.onChange(String(this.max));
  }

  public onChange(value: string): void {
    this.value = String(aucToBN(value).gt(this.max) ? this.max : value);

    if (this.inputElement?.nativeElement) {
      const inputElement = this.inputElement.nativeElement;
      inputElement.value = this.value || '';
    }

    this._onChange(this.value);
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(value: string): void {
    this.value = value || '';
    this._cdr.markForCheck();
  }

  private _onChange: (value: string) => void = () => {
  };

  private _onTouched: () => void = () => {
  };

  private setElStyles(): void {
    const element = this._elementRef.nativeElement;

    element.style.display = this.adaptive ? 'block' : 'inline-flex'
  }
}
