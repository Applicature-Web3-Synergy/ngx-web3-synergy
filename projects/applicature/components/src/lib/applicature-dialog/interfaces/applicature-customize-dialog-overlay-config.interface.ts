import { AucOverlayCustomizationConfig } from '../../renamed/overlay';

export interface ApplicatureCustomizeDialogOverlayConfigInterface extends AucOverlayCustomizationConfig {
  hasOverlay?: boolean;
  closeByClick?: boolean;
  overlayClass?: string | string[];
  transparent?: boolean,
}
