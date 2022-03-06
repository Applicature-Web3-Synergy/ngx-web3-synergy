import { ApplicatureOverlayCustomizationConfig } from '../../applicature-overlay';

export interface ApplicatureCustomizeDialogOverlayConfigInterface extends ApplicatureOverlayCustomizationConfig {
  hasOverlay?: boolean;
  closeByClick?: boolean;
  overlayClass?: string | string[];
  transparent?: boolean,
}
