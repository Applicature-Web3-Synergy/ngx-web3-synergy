import { W3sOverlayCustomizationConfig } from '../../overlay';
import { W3sPosition } from '../../interfaces';

export interface W3sDropdownConfig {
  overlay?: W3sOverlayCustomizationConfig;
  position?: W3sPosition;
  class?: string | string[];
  minWidth?: number;
  minHeight?: number;
  fullwidth?: boolean;
}
