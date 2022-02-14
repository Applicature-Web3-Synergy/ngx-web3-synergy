import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { APPLICATURE_COLORS, ColorProperties } from '@applicature/styles';

export type  ApplicatureAlertColor = 'blue' | 'red' | 'green' | 'orange' | 'grey' | 'white';

export type  ApplicatureAlertIconPosition = 'left' | 'right';

@Component({
  selector: 'applicature-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit, OnChanges {
  @Input()
  public text!: string;

  @Input()
  public icon!: string;

  @Input()
  public iconPosition: ApplicatureAlertIconPosition = 'left';

  @Input()
  public color: ApplicatureAlertColor = 'red';

  public get classNames(): { [el: string]: boolean } {
    return {
      ['alert']: true,
      [`alert--white`]: this.color === 'white',
      [`alert--icon-${this.iconPosition}`]: true,
    };
  }

  @ViewChild('alertRef', { static: true })
  private _alertRef!: ElementRef<HTMLDivElement>;

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnChanges(): void {
    const { base, text } = APPLICATURE_COLORS[this.color] as ColorProperties;
    const style = this._alertRef.nativeElement.style;

    style.setProperty(`--applicature-alert-text`, text);
    style.setProperty(`--applicature-alert-background`, base);
  }
}
