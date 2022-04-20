import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ExampleCardTab } from './interfaces';


@Component({
  selector: 'doc-example-card',
  templateUrl: './example-card.component.html',
  styleUrls: [ './example-card.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleCardComponent {
  @Input() tabs?: ExampleCardTab[];
  @Input() title?: string;

  public showCode = false;

  toggleShow(): void {
    this.showCode = !this.showCode;
  }
}
