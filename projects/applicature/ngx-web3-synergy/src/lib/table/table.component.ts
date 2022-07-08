import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { W3sTableHeaderItem, W3sTableRow } from './interfaces';
import { W3sSort } from '../interfaces';
import { W3S_SORT_DIRECTION } from '../enums';


@Component({
  selector: 'w3s-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sTableComponent {
  /**
   * Sets table headers. <br>
   * It's required parameter.
   */
  @Input()
  public set tableHeaders(headers: W3sTableHeaderItem[]) {
    this.headers = headers.sort((a: W3sTableHeaderItem, b: W3sTableHeaderItem) =>
      a.position - b.position);
  }

  /**
   * Table data. <br>
   * It's required parameter.
   */
  @Input()
  public data: W3sTableRow[] = [];

  /**
   * Shows load more button. <br>
   * If true the Load more button will be visible. <br>
   * It's' an optional parameter. <br>
   * The default value is false.
   */
  @Input()
  public isLoadMore?: boolean = false;

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
  public sort: EventEmitter<W3sSort> = new EventEmitter<W3sSort>();

  /** Table headers */
  public headers: W3sTableHeaderItem[] = [];

  /** Sort directions */
  public SORT_DIRECTION = W3S_SORT_DIRECTION;

  /** Emit {@link loadMore} event. */
  public onLoadMore(): void {
    this.loadMore.emit();
  }

  /** Emit {@link sort} event. */
  public sortBy(sort: W3sSort, columnIndex: number): void {
    if (!sort || !this.headers[columnIndex]?.sort) {
      return;
    }

    sort.sortDirection = sort.sortDirection === W3S_SORT_DIRECTION.ASC
      ? W3S_SORT_DIRECTION.DESC
      : W3S_SORT_DIRECTION.ASC;
    this.headers[columnIndex].sort.sortDirection = sort.sortDirection;

    this.sort.emit(sort);
  }

}
