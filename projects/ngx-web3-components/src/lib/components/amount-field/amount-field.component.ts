import {
  ChangeDetectionStrategy,
  Component, ElementRef, forwardRef,
  Input, ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { valueToBigNumber } from '../../helpers';

export const AMOUNT_FIELD_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmountFieldComponent),
  multi: true,
};

@Component({
  selector: 'amount-field',
  templateUrl: './amount-field.component.html',
  styleUrls: ['./amount-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AMOUNT_FIELD_VALUE_ACCESSOR],
})
export class AmountFieldComponent implements ControlValueAccessor {
  @ViewChild('inputElement', { static: true })
  public inputElement!: ElementRef;

  public focus: boolean = false
  public readonly: boolean = false;
  public value!: string;
  public hintTemplate: SafeHtml;

  @Input()
  public decimal: boolean = true;

  @Input()
  public height: number = 48;

  @Input()
  public label!: string;

  @Input()
  public placeholder: string = '';

  @Input()
  public set hint(value: string) {
    this.hintTemplate = this.sanitizer.bypassSecurityTrustHtml(value);
  };

  @Input()
  public errors!: string[];

  @Input()
  public prefix!: string;

  @Input()
  public suffix!: string;

  @Input()
  public disabled: boolean = false;

  @Input()
  public max!: number | string | any;

  constructor(private sanitizer: DomSanitizer) {
  }

  public onChange(value: string | number): void {
    this.value = String(this.max && valueToBigNumber(value).gt(this.max) ? this.max : value);

    if (this.inputElement?.nativeElement) {
      const inputElement = this.inputElement.nativeElement as HTMLInputElement;
      inputElement.value = this.value ? this.value : '';
    }

    this._onChange(this.value);
  }

  public onMaxClick(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    this.onChange(this.max);
  }

  public registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(value: string): void {
  }

  private _onChange: (value: string) => void = () => {
  };

  private _onTouched: () => void = () => {
  };
}
