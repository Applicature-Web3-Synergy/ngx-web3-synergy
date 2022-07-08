import { AfterViewInit, Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Directive({
  selector: '[w3sDropdownMenu]',
  exportAs: 'w3sDropdownMenu'
})
export class W3sDropdownMenuDirective implements AfterViewInit {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private _templateRef: TemplateRef<any>,
              private _viewContainerRef: ViewContainerRef,
              @Inject(DOCUMENT) private document: Document
  ) {
  }

  public ngAfterViewInit(): void {
    const embeddedViewRef = this._viewContainerRef.createEmbeddedView(this._templateRef);

    embeddedViewRef.detectChanges();

    embeddedViewRef.rootNodes.forEach(node => this.document.body.appendChild(node));
  }

}
