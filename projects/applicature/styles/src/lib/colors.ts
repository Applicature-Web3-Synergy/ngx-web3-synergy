export enum AS_COLOR_GROUP {
  BLUE = 'blue',
  GREEN = 'green',
  GRAY = 'gray',
  ORANGE = 'orange',
  RED = 'red',
  WHITE = 'white'
}

type AsW3sEnumsTypeTransformer<T> = T extends string ? `${T}` : never;

export type AsColorGroup = AsW3sEnumsTypeTransformer<AS_COLOR_GROUP.BLUE
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
    base: '#1C9ACC',
    hover: '#3EA9D4',
    light: '#72C0DF',
    dark: '#1D82AA',
    text: '#FFF',
    border: '#1C9ACC',
    borderHover: '#3EA9D4',
    borderFocus: '#1D82AA'
  },
  [AS_COLOR_GROUP.RED]: {
    base: '#E31B89',
    hover: '#E73D9B',
    light: '#EE72B6',
    dark: '#BC1C74',
    text: '#FFF',
    border: '#E31B89',
    borderHover: '#E73D9B',
    borderFocus: '#BC1C74'
  },
  [AS_COLOR_GROUP.GREEN]: {
    base: '#14D9A5',
    hover: '#37DFB3',
    light: '#6DE7C7',
    dark: '#17B48B',
    text: '#FFF',
    border: '#14D9A5',
    borderHover: '#37DFB3',
    borderFocus: '#17B48B'
  },
  [AS_COLOR_GROUP.ORANGE]: {
    base: '#F09643',
    hover: '#F2A45B',
    light: '#F6BE8A',
    dark: '#C77F3C',
    text: '#FFF',
    border: '#F09643',
    borderHover: '#F2A45B',
    borderFocus: '#C77F3C'
  },
  [AS_COLOR_GROUP.GRAY]: {
    base: '#6D8EAC',
    hover: '#BACAD8',
    light: '#F3F6F8',
    dark: '#5E7890',
    text: '#FFF',
    border: '#6D8EAC',
    borderHover: '#BACAD8',
    borderFocus: '#5E7890'
  },
  [AS_COLOR_GROUP.WHITE]: {
    base: '#FFF',
    hover: '#FFF',
    light: '#FFF',
    dark: '#FFF',
    text: '#072F3F',
    border: '#FFF',
    borderHover: '#F3F6F8',
    borderFocus: '#3EA9D4'
  },
}
