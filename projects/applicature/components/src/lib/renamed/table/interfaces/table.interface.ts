import { AucSort } from '../../../interfaces';

export interface AucTableHeaderItem {
  position: number; // column position 1, 2, 3, ...
  rowKey: string;
  value: string;
  icon?: string;
  sort?: AucSort;
  sortBy?: string;
}

export interface AucTableRowItem {
  value: string;
  link?: string;
  icon?: string;
  withBg?: boolean;
}

export interface AucTableRow {
  [key: string]: AucTableRowItem | AucTableRowItem[];
}

