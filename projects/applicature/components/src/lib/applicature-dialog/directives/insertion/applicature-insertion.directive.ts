import { Directive, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[applicatureInsertion]'
})
export class ApplicatureInsertionDirective {
  get viewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }

  constructor(public _viewContainerRef: ViewContainerRef) {
  }
}
