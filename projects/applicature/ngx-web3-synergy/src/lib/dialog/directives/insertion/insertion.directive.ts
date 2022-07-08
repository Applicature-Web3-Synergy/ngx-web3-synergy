import { Directive, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[w3sInsertion]',
  exportAs: 'w3sInsertion'
})
export class W3sInsertionDirective {
  get viewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }

  constructor(public _viewContainerRef: ViewContainerRef) {
  }
}
