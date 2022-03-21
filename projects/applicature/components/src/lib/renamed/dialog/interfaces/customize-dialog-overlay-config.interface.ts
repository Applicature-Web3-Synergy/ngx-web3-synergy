import { AucOverlayCustomizationConfig } from '../../overlay';

export interface AucCustomizeDialogOverlayConfigInterface extends AucOverlayCustomizationConfig {
  hasOverlay?: boolean;
  closeByClick?: boolean;
  overlayClass?: string | string[];
  transparent?: boolean,
}
