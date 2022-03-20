import { AucOverlayCustomizationConfig } from '../../overlay';
import { AucPosition } from '../../../interfaces';

export interface AucDropdownConfig {
  overlay?: AucOverlayCustomizationConfig;
  position?: AucPosition;
  class?: string | string[];
  minWidth?: number;
  minHeight?: number;
}
