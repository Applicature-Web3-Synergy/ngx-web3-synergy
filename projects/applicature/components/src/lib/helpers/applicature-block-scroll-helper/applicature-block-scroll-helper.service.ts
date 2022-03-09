import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ApplicatureBlockScrollHelperService {
  constructor(@Inject(DOCUMENT) private _document: Document) {
  }

  public lockScroll(): void {
    this._document.body.classList.add('block-scroll');
  }

  public unLockScroll(): void {
    this._document.body.classList.remove('block-scroll');
  }
}
