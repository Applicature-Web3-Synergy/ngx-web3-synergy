import { W3S_WLC_ICON } from '../enums';
import { W3sEnumsTypeTransformer } from '../../types';

/**
 * You can use supported icons from enum {@link W3S_WLC_ICON} or string; <br>
 * If you want to use custom icon, you need to provide url to the image as a string value.
 */
export type W3sWlcIcon = W3sEnumsTypeTransformer<W3S_WLC_ICON.ACTIVE
  | W3S_WLC_ICON.ARROW_DOWN
  | W3S_WLC_ICON.ARROW_UP
  | W3S_WLC_ICON.CHECK
  | W3S_WLC_ICON.CHEVRON_DOWN
  | W3S_WLC_ICON.CHEVRON_UP
  | W3S_WLC_ICON.CLOSE
  | W3S_WLC_ICON.COPY
  | W3S_WLC_ICON.EXTERNAL_LINK
  | W3S_WLC_ICON.FAIL
  | W3S_WLC_ICON.MINUS
  | W3S_WLC_ICON.PLUS
  | W3S_WLC_ICON.RECENT
  | W3S_WLC_ICON.STAR
  | W3S_WLC_ICON.USER
  | W3S_WLC_ICON.WALLET
  | W3S_WLC_ICON.WALLET_CONNECT
  | W3S_WLC_ICON.WRONG
  | string>;
