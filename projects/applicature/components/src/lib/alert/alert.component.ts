import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AsColors, AsColorProperties } from '@applicature/styles';
import { AucSetStyleProp } from '../renamed/directives';

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

  public styleProperties: AucSetStyleProp[] = [];
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
    const { base, text } = AsColors[this.color] as AsColorProperties;

    this.styleProperties = [
      {
        name: '--applicature-alert-text',
        value: text
      },
      {
        name: '--applicature-alert-background',
        value: base
      },
    ];
  }
}
