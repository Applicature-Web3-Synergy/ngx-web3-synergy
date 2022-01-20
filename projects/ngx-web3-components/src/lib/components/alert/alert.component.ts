import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  Input, OnChanges, OnInit,
} from '@angular/core';
import { COLORS_MAP } from '../../styles/colors-map';

export type  AlertBackgroundColor = 'blue' | 'red' | 'green' | 'orange' | 'grey' | 'white';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit, OnChanges {
  @Input()
  public icon!: string;

  @Input()
  public message!: string;

  @Input()
  public color: AlertBackgroundColor = 'red';

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
  ) {
  }

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnChanges(): void {
    Object.keys(COLORS_MAP[this.color] || COLORS_MAP['red'])
      .filter((prop) => prop === 'base')
      .forEach((prop) => {
        this._elementRef.nativeElement.style
          .setProperty(`--alert-background-${prop}`, (COLORS_MAP[this.color] as any)[prop]);
      });
  }
}
