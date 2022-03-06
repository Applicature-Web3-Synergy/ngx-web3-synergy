import { ApplicatureOverlayCustomizationConfig } from '../../applicature-overlay';
import { ApplicaturePosition } from '../../interfaces';

export interface ApplicatureDropdownConfig {
  overlay?: ApplicatureOverlayCustomizationConfig;
  position?: ApplicaturePosition;
  class?: string | string[];
  minWidth?: number;
  minHeight?: number;
}
