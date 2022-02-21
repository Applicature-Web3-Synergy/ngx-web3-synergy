import { Directive, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[applicatureInsertion]'
})
export class InsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
