import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Used for lock / unlock scroll for body.
 */
@Injectable()
export class AucBlockScrollHelperService {
  constructor(@Inject(DOCUMENT) private _document: Document) {
  }

  /**
   * @link lockScroll add class `block-scroll` to body;
   * This class will block scroll for body;
   */
  public lockScroll(): void {
    this._document.body.classList.add('block-scroll');
  }

  /**
   * @link unlockScroll remove class `block-scroll` from body;
   * This class will unlock scroll for body;
   */
  public unlockScroll(): void {
    this._document.body.classList.remove('block-scroll');
  }
}
