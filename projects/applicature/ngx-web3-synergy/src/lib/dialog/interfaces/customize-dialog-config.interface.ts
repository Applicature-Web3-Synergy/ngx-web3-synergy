import { W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS } from '../enums';
import { W3sDialogPosition } from '../types';

export interface W3sCustomizeDialogConfig {
  [W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.WIDTH]?: string;
  [W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.HEIGHT]?: string;
  [W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.MIN_WIDTH]?: string;
  [W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.MIN_HEIGHT]?: string;
  [W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.MAX_WIDTH]?: string;
  [W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.MAX_HEIGHT]?: string;
  [W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.CLASSES]?: string | string[];
  [W3S_CUSTOMIZE_DIALOG_CONFIG_KEYS.POSITION]?: W3sDialogPosition;
}
