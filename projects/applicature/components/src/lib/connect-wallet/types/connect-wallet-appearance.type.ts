import { AUC_CONNECT_WALLET_APPEARANCE } from '../enums';
import { EnumsTypeTransformer } from '../../types';

export type ConnectWalletAppearance = EnumsTypeTransformer<AUC_CONNECT_WALLET_APPEARANCE.ICON
  | AUC_CONNECT_WALLET_APPEARANCE.BUTTON>;
