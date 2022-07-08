import { W3sSort } from '../../interfaces';

export interface W3sTableHeaderItem {
  position: number; // column position 1, 2, 3, ...
  rowKey: string;
  value: string;
  icon?: string;
  sort?: W3sSort;
  sortBy?: string;
}

export interface W3sTableRowItem {
  value: string;
  link?: string;
  icon?: string;
  withBg?: boolean;
}

export interface W3sTableRow {
  [key: string]: W3sTableRowItem | W3sTableRowItem[];
}

