import { DialogPosition } from './types';

export class DialogConfig<D = any> {
  data?: D;
  width?: string; // '300px', '50%', '1rem' ...
  height?: string; // '300px', '50%', '1rem' ...
  minWidth?: string; // '300px', '50%', '1rem' ...
  minHeight?: string; // '300px', '50%', '1rem' ...
  maxWidth?: string; // '300px', '50%', '1rem' ...
  maxHeight?: string; // '300px', '50%', '1rem' ...
  position?: DialogPosition;
  dialogClass?: string | string[];
  panel?: {
    panelClass: string | string[];
  };
  overlay?: {
    hasOverlay?: boolean;
    closeByClick?: boolean;
    overlayClass?: string | string[];
  };
}
