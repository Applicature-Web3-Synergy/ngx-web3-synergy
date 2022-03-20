import { AucOverlayCustomizationConfig } from '../../renamed/overlay';
import { ApplicaturePosition } from '../../interfaces';

export interface ApplicatureDropdownConfig {
  overlay?: AucOverlayCustomizationConfig;
  position?: ApplicaturePosition;
  class?: string | string[];
  minWidth?: number;
  minHeight?: number;
}
