import { W3S_WRONG_NETWORK_APPEARANCE } from '../enums';
import { W3sEnumsTypeTransformer } from '../../../types';

export type W3sWrongNetworkAppearance = W3sEnumsTypeTransformer<W3S_WRONG_NETWORK_APPEARANCE.DISCONNECT
  | W3S_WRONG_NETWORK_APPEARANCE.NONE
  | W3S_WRONG_NETWORK_APPEARANCE.SWITCH>;
