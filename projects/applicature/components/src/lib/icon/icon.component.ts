import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'applicature-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input()
  public color: string = '#FFF';

  @Input()
  public set icon(value: string) {
    this.isImage = (/.+\..+$/i).test(value);

    this._icon = value;
  }

  public get icon(): string {
    return this._icon;
  }

  private _icon!: string;

  public isImage: boolean = false;
}
