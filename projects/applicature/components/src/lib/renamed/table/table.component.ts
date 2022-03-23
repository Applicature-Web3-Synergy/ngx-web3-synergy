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
   * {@link tableHeaders} - It's an `@Input()` parameter.
   * Sets table headers.
   * This is required parameter.
   */
  @Input() set tableHeaders(headers: AucTableHeaderItem[]) {
    this.headers = headers.sort((a: AucTableHeaderItem, b: AucTableHeaderItem) =>
      a.position - b.position);
  };

  /**
   * {@link data} - It's an `@Input()` parameter.
   * Sets table data.
   * This is required parameter.
   */
  @Input() data: AucTableRow[] = [];

  /**
   * {@link isLoadMore} - It's an `@Input()` parameter.
   * If true the Load more button will be visible.
   * This is an optional parameter. The default value is false
   */
  @Input() isLoadMore: boolean = false;

  /**
   * {@link customize} - It's an `@Input()` parameter.
   * Sets custom class to the table container.
   * This is an optional parameter.
   */
  @Input() customClass?: string | string[];

  /**
   * {@link loadMore} - It's an `@Output()` parameter.
   * Emits when load more button was clicked.
   */
  @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();

  /**
   * {@link sort} - It's an `@Output()` parameter.
   * Emits when sort was clicked.
   */
  @Output() sort: EventEmitter<AucSort> = new EventEmitter<AucSort>();

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
