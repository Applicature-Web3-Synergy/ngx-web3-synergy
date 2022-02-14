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
import { toBN } from '../helpers';

export const INPUT_FIELD_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'applicature-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [INPUT_FIELD_VALUE_ACCESSOR],
})
export class InputComponent implements ControlValueAccessor, OnChanges, OnInit {
  @ViewChild('inputElement', { static: true })
  public inputElement!: ElementRef<HTMLInputElement>;

  @Input()
  public decimal: boolean = true;

  @Input()
  public adaptive: boolean = false;

  @Input()
  public height: number = 48;

  @Input()
  public label!: string;

  @Input()
  public placeholder: string = '';

  @Input()
  public prefix!: string;

  @Input()
  public suffix!: string;

  @Input()
  public disabled: boolean = false;

  @Input()
  public max!: number;

  @Input()
  public hint!: string;

  @Input()
  public errors!: string[];

  public value!: string;
  public focus: boolean = false;

  public get classNames(): { [el: string]: boolean } {
    return {
      ['input__container']: true,
      ['input__container--prefix']: !!this.prefix,
      ['input__container--suffix']: !!this.suffix,
      ['input__container--disabled']: this.disabled,
      ['input__container--focus']: this.focus,
      ['input__container--error']: this.errors?.length > 0,
    };
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
  }

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnChanges(changes?: SimpleChanges): void {
    const element = this._elementRef.nativeElement;

    element.style.display = this.adaptive ? 'block' : 'inline-flex'
  }

  public onMaxClick(): void {
    if (this.disabled || !this.max) {
      return;
    }

    this.onChange(String(this.max));
  }

  public onChange(value: string): void {
    this.value = String(toBN(value).gt(this.max) ? this.max : value);

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
}
