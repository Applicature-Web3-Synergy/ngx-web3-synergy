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
import { APPLICATURE_COLORS, ColorProperties } from '@applicature/styles';

export type  ApplicatureButtonColor = 'blue' | 'red' | 'green' | 'orange' | 'grey' | 'white';

export type  ApplicatureButtonAppearance = 'stroked' | 'flat' | 'icon';

@Component({
  selector: 'applicature-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input()
  public height: number = 40;

  @Input()
  public disabled: boolean = false;

  @Input()
  public leftIcon!: string;

  @Input()
  public rightIcon!: string;

  @Input()
  public color: ApplicatureButtonColor = 'blue';

  @Input()
  public appearance: ApplicatureButtonAppearance = 'flat';

  @Input()
  public borderRadius: number = 8;

  @Input()
  public transparent: boolean = false;

  @Input()
  public pending: boolean = false;

  @Input()
  public adaptive: boolean = false;

  @Input()
  public label!: string;

  @Input()
  public identicon!: HTMLDivElement;

  @Output('onClick')
  public onClickEmitter: EventEmitter<any> = new EventEmitter<any>();

  public get classNames(): { [el: string]: boolean } {
    return {
      ['button']: true,
      [`button--white`]: this.color === 'white',
      ['button--disabled']: this.disabled,
      ['button--adaptive']: this.adaptive,
      ['button--transparent']: this.transparent,
      [`button--${this.appearance}`]: true,
    };
  }

  @ViewChild('buttonRef', { static: true })
  private _buttonRef!: ElementRef<HTMLButtonElement>;

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnChanges(): void {
    const colorProperties = APPLICATURE_COLORS[this.color || 'blue'] as ColorProperties;
    const style = this._buttonRef.nativeElement.style;

    Object.keys(colorProperties).forEach((prop) => {
      style.setProperty(`--applicature-button-${prop}`, (colorProperties as any)[prop]);
    });

    style.setProperty(`--applicature-button-radius`, `${this.borderRadius}px`);

    const element = this._buttonRef?.nativeElement as HTMLButtonElement;

    if (this.identicon && element) {
      const previousIdenticon = element.querySelector(':scope > div');

      if (previousIdenticon) {
        element.removeChild(previousIdenticon);
      }

      this.identicon.style.marginLeft = '8px';

      element.appendChild(this.identicon);
    }
  }

  public onClick(event: any): void {
    if (this.disabled) {
      return;
    }

    this.onClickEmitter.emit(event);
  }
}
