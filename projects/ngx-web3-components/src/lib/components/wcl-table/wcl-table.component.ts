import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface TableColumn {
  columnDef: string;
  headerCellDef: string;
  templateRef?: TemplateRef<any>;
}

@Component({
  selector: 'wcl-table',
  templateUrl: './wcl-table.component.html',
  styleUrls: ['./wcl-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WclTableComponent implements OnInit, OnChanges {
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public displayedColumns: string[];

  @Input()
  public data: any[];

  @Input()
  public set columns(values: TableColumn[]) {
    if (values && values.length > 0) {
      this.displayedColumns = values.map(v => v.columnDef);
    }

    this._columns = values;
  }

  @Output('loadMoreClick')
  public loadMoreEmitter: EventEmitter<void> = new EventEmitter<void>();

  public get columns(): TableColumn[] {
    return this._columns;
  }

  public get isLastItem(): (index: number, element: any) => boolean {
    return (index, element: any) => {
      return Boolean(index === this.dataSource.data.length - 1);
    };
  }

  private _columns: TableColumn[];

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnChanges(changes?: SimpleChanges): void {
    this.dataSource.data = this.data;
  }

  public onLoadMoreClick(): void {
    this.loadMoreEmitter.emit();
  }
}
