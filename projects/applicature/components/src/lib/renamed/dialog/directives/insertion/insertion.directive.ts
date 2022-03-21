import { Directive, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[aucInsertion]',
  exportAs: 'aucInsertion'
})
export class AucInsertionDirective {
  get viewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }

  constructor(public _viewContainerRef: ViewContainerRef) {
  }
}
