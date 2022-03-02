import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { ApplicatureTableHeaderItem, ApplicatureTableRow } from './interfaces';
import { Sort } from '../interfaces';
import { SORT_DIRECTION } from '../enums';


@Component({
  selector: 'applicature-table',
  templateUrl: './applicature-table.component.html',
  styleUrls: [ './applicature-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicatureTableComponent {
  @Input() set tableHeaders(headers: ApplicatureTableHeaderItem[]) {
    this.headers = headers.sort((a: ApplicatureTableHeaderItem, b: ApplicatureTableHeaderItem) =>
      a.position - b.position);
  };

  @Input() data: ApplicatureTableRow[] = [];
  @Input() isLoadMore: boolean = false;
  @Input() customClass: string | string[];
  @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();
  @Output() sort: EventEmitter<Sort> = new EventEmitter<Sort>();

  public headers: ApplicatureTableHeaderItem[] = [];
  public SORT_DIRECTION = SORT_DIRECTION;

  public onLoadMore(): void {
    this.loadMore.emit();
  }

  public sortBy(sort: Sort, columnIndex: number): void {
    if (!sort || !this.headers[columnIndex]?.sort) {
      return;
    }

    sort.sortDirection = sort.sortDirection === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC;
    this.headers[columnIndex].sort.sortDirection = sort.sortDirection;

    this.sort.emit(sort);
  }

}
