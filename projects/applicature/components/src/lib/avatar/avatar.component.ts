import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'applicature-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input()
  public src!: string;

  @Input()
  public size: number = 40;
}
