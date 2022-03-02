import { Sort } from '../../interfaces/sort.interface';

export interface ApplicatureTableHeaderItem {
  position: number; // column position 1, 2, 3, ...
  rowKey: string;
  value: string;
  icon?: string;
  sort?: Sort;
  sortBy?: string;
}

export interface ApplicatureTableRowItem {
  value: string;
  link?: string;
  icon?: string;
  withBg?: boolean;
}

export interface ApplicatureTableRow {
  [key: string]: ApplicatureTableRowItem | ApplicatureTableRowItem[];
}

