import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'doc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
}
