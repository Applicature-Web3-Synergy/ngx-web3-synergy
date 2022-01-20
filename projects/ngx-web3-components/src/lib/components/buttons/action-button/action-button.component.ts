import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output, ViewChild,
} from '@angular/core';
import { COLORS_MAP } from '../../../styles/colors-map';

export type  ActionButtonColor = 'blue' | 'red' | 'green' | 'orange' | 'grey' | 'white';

export type  ActionButtonAppearance = 'stroked' | 'flat' | 'icon';

@Component({
  selector: 'action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonComponent implements OnInit, OnChanges {
  @ViewChild('actionButton', { static: true })
  public actionButton!: ElementRef;

  @Input()
  public identicon!: HTMLDivElement;

  @Input()
  public identiconPosition: 'left' | 'right' = 'right';

  @Input()
  public label!: string | undefined;

  @Input()
  public color: ActionButtonColor = 'blue';

  @Input()
  public appearance: ActionButtonAppearance = 'flat';

  @Input()
  public height: number = 40;

  @Input()
  public disabled: boolean = false;

  @Input()
  public fullWidth: boolean = false;

  @Input()
  public src!: string | undefined;

  @Input()
  public leftIcon!: string;

  @Input()
  public rightIcon!: string;

  @Input()
  public onlyIcon!: string;

  @Input()
  public pending: boolean = false;

  @Input()
  public transparent: boolean = false;

  @Input()
  public borderRadius: boolean = true;

  @Output('onClick')
  public onClickEmitter: EventEmitter<any> = new EventEmitter<any>();

  public get classNames(): { [el: string]: boolean } {
    return {
      ['wcl-button']: true,
      [`wcl-button--${this.color}`]: true,
      [`wcl-button--${this.appearance}`]: true,
      ['wcl-button--adaptive']: this.fullWidth,
      ['wcl-button--no-radius']: !this.borderRadius,
      ['wcl-button--transparent']: this.transparent,
      ['wcl-button--only-icon']: !!this.onlyIcon,
    };
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
  ) {
  }

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnChanges(): void {
    Object.keys(COLORS_MAP[this.color] || COLORS_MAP['blue'])
      .forEach((prop) => {
        this._elementRef.nativeElement.style
          .setProperty(`--button-${prop}-color`, (COLORS_MAP[this.color] as any)[prop]);
      });

    const element = this.actionButton?.nativeElement as HTMLButtonElement;

    if (this.identicon && !this.onlyIcon && element) {
      const prevIcon = element.querySelector(':scope > div');

      if (prevIcon) {
        element.removeChild(prevIcon);
      }

      const position = this.identiconPosition === 'left' ? 'Right' : 'Left';

      this.identicon.style[`margin${position}` as any] = '8px';

      element.appendChild(this.identicon);
    }
  }


  public onClick(evt: any): void {
    if (this.disabled) {
      return;
    }

    this.onClickEmitter.emit(evt);
  }
}
