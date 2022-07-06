import { AUC_BALANCE_APPEARANCE } from '../enums';
import { EnumsTypeTransformer } from '../../types';

export type AucBalanceAppearance = EnumsTypeTransformer<AUC_BALANCE_APPEARANCE.TRANSPARENT
  | AUC_BALANCE_APPEARANCE.TRANSLUCENT>;
