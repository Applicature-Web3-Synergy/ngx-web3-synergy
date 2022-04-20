import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { AucTableHeaderItem, AucTableRow } from './interfaces';
import { AucSort } from '../interfaces';
import { AUC_SORT_DIRECTION } from '../enums';


@Component({
  selector: 'auc-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucTableComponent {
  /**
   * Sets table headers. <br>
   * It's required parameter.
   */
  @Input()
  public set tableHeaders(headers: AucTableHeaderItem[]) {
    this.headers = headers.sort((a: AucTableHeaderItem, b: AucTableHeaderItem) =>
      a.position - b.position);
  };

  /**
   * Sets table data. <br>
   * It's required parameter.
   */
  @Input()
  public data: AucTableRow[] = [];

  /**
   * If true the Load more button will be visible. <br>
   * It's' an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public isLoadMore: boolean = false;

  /**
   * Sets custom class to the table container. <br>
   * It's an optional parameter.
   */
  @Input()
  public customClass?: string | string[];

  /** Emits event when load more button was clicked. */
  @Output()
  public loadMore: EventEmitter<void> = new EventEmitter<void>();

  /** Emits when sort was clicked. */
  @Output()
  public sort: EventEmitter<AucSort> = new EventEmitter<AucSort>();

  public headers: AucTableHeaderItem[] = [];
  public SORT_DIRECTION = AUC_SORT_DIRECTION;

  public onLoadMore(): void {
    this.loadMore.emit();
  }

  public sortBy(sort: AucSort, columnIndex: number): void {
    if (!sort || !this.headers[columnIndex]?.sort) {
      return;
    }

    sort.sortDirection = sort.sortDirection === AUC_SORT_DIRECTION.ASC
      ? AUC_SORT_DIRECTION.DESC
      : AUC_SORT_DIRECTION.ASC;
    this.headers[columnIndex].sort.sortDirection = sort.sortDirection;

    this.sort.emit(sort);
  }

}
