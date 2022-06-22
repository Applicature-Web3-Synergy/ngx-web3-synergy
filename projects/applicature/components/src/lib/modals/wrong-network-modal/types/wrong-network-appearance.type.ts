import { AUC_WRONG_NETWORK_APPEARANCE } from '../enums';
import { EnumsTypeTransformer } from '../../../types';

export type AucWrongNetworkAppearance = EnumsTypeTransformer<AUC_WRONG_NETWORK_APPEARANCE.DISCONNECT
  | AUC_WRONG_NETWORK_APPEARANCE.NONE
  | AUC_WRONG_NETWORK_APPEARANCE.SWITCH>;
