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
    this.removeHtmlOverflow();
  }

  /** Needs because of @web3-onboard added it, and it's affect scroll*/
  public removeHtmlOverflow(): void {
    let iteration = 1;

    this._document.querySelector('html').style.removeProperty('overflow');

    while (iteration < 5) {
      setTimeout(() => {
        this._document.querySelector('html').style.removeProperty('overflow');
      }, 1000);

      iteration++;
    }
  }
}
