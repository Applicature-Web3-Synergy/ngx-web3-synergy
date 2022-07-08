import { W3S_CONNECT_WALLET_APPEARANCE } from '../enums';
import { W3sEnumsTypeTransformer } from '../../types';

export type W3sConnectWalletAppearance = W3sEnumsTypeTransformer<W3S_CONNECT_WALLET_APPEARANCE.ICON
  | W3S_CONNECT_WALLET_APPEARANCE.BUTTON>;
