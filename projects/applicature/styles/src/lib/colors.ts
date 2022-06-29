export enum AS_COLOR_GROUP {
  BLUE = 'blue',
  GREEN = 'green',
  GRAY = 'gray',
  ORANGE = 'orange',
  RED = 'red',
  WHITE = 'white'
}

type AsEnumsTypeTransformer<T> = T extends string ? `${T}` : never;

export type AsColorGroup = AsEnumsTypeTransformer<AS_COLOR_GROUP.BLUE
  | AS_COLOR_GROUP.GREEN
  | AS_COLOR_GROUP.GRAY
  | AS_COLOR_GROUP.ORANGE
  | AS_COLOR_GROUP.RED
  | AS_COLOR_GROUP.WHITE>;

export interface AsColorProperties {
  base: string;
  hover: string;
  light: string;
  dark: string;
  text: string;
  border: string;
  borderHover: string;
  borderFocus: string;
}

export const AsColors: { [key in AsColorGroup]: AsColorProperties } = {
  [AS_COLOR_GROUP.BLUE]: {
    base: '#4678F0',
    hover: '#608BF2',
    light: '#8CABF6',
    dark: '#3F67C7',
    text: '#FFFFFF',
    border: '#4678F0',
    borderHover: '#608BF2',
    borderFocus: '#3F67C7',
  },
  [AS_COLOR_GROUP.RED]: {
    base: '#E84142',
    hover: '#EA5C5E',
    light: '#F0898B',
    dark: '#C03B3C',
    text: '#FFFFFF',
    border: '#E84142',
    borderHover: '#EA5C5E',
    borderFocus: '#C03B3C',
  },
  [AS_COLOR_GROUP.GREEN]: {
    base: '#37CA34',
    hover: '#6BD66B',
    light: '#94E194',
    dark: '#33A830',
    text: '#FFFFFF',
    border: '#37CA34',
    borderHover: '#6BD66B',
    borderFocus: '#33A830',
  },
  [AS_COLOR_GROUP.ORANGE]: {
    base: '#F09643',
    hover: '#F2A45B',
    light: '#F6BE8A',
    dark: '#C77F3C',
    text: '#FFFFFF',
    border: '#F09643',
    borderHover: '#F2A45B',
    borderFocus: '#C77F3C',
  },
  [AS_COLOR_GROUP.GRAY]: {
    base: '#6D87AC',
    hover: '#BBC7D9',
    light: '#DDE3EC',
    dark: '#5F7492',
    text: '#FFFFFF',
    border: '#6D87AC',
    borderHover: '#BBC7D9',
    borderFocus: '#5F7492',
  },
  [AS_COLOR_GROUP.WHITE]: {
    base: '#FFFFFF',
    hover: '#FFFFFF',
    light: '#FFFFFF',
    dark: '#FFFFFF',
    text: '#222222',
    border: '#FFFFFF',
    borderHover: '#DDE3EC',
    borderFocus: '#608BF2',
  },
}
