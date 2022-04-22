import { AUC_WLC_ICON } from '../enums';
/**
 * You can use supported icons from enum {@link AUC_WLC_ICON} or string; <br>
 * If you want to use custom icon, you need to provide url to the image as a string value.
 */
export type AucWlcIcon = AUC_WLC_ICON.ACTIVE
  | AUC_WLC_ICON.ARROW_DOWN
  | AUC_WLC_ICON.ARROW_UP
  | AUC_WLC_ICON.CHECK
  | AUC_WLC_ICON.CHEVRON_DOWN
  | AUC_WLC_ICON.CHEVRON_UP
  | AUC_WLC_ICON.CLOSE
  | AUC_WLC_ICON.COPY
  | AUC_WLC_ICON.EXTERNAL_LINK
  | AUC_WLC_ICON.FAIL
  | AUC_WLC_ICON.MINUS
  | AUC_WLC_ICON.PLUS
  | AUC_WLC_ICON.RECENT
  | AUC_WLC_ICON.STAR
  | AUC_WLC_ICON.USER
  | AUC_WLC_ICON.WALLET
  | AUC_WLC_ICON.WALLET_CONNECT
  | AUC_WLC_ICON.WRONG
  | string;
