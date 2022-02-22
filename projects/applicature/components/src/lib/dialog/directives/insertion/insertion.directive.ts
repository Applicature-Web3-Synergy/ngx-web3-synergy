import { Directive, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[applicatureInsertion]'
})
export class InsertionDirective {
  get viewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }

  constructor(public _viewContainerRef: ViewContainerRef) {
  }
}
