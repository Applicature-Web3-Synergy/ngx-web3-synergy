import { W3S_BALANCE_APPEARANCE } from '../enums';
import { W3sEnumsTypeTransformer } from '../../types';

export type W3sBalanceAppearance = W3sEnumsTypeTransformer<W3S_BALANCE_APPEARANCE.TRANSPARENT
  | W3S_BALANCE_APPEARANCE.TRANSLUCENT>;
