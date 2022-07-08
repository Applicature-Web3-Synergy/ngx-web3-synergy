import { W3sOverlayCustomizationConfig } from '../../overlay';

export interface W3sCustomizeDialogOverlayConfigInterface extends W3sOverlayCustomizationConfig {
  hasOverlay?: boolean;
  closeByClick?: boolean;
  overlayClass?: string | string[];
  transparent?: boolean,
}
