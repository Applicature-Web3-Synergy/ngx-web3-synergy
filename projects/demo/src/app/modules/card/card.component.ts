import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { CardHelperService } from './services';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnChanges {
  @Input() title!: string;

  public expanded = true;

  constructor(private cardHelperService: CardHelperService) {

  }

  ngOnChanges() {
    if (this.title) {
      this.expanded = !this.cardHelperService.notExpandedSet.has(this.title);
    }
  }

  public toggleExpand(): void {
    this.expanded = !this.expanded;

    this.cardHelperService.toggleExpand(this.title, this.expanded);
  }
}
