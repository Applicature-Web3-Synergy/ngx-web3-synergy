import {
  AfterViewInit,
  Directive,
  EmbeddedViewRef,
  Inject,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ApplicatureBlockScrollHelperService } from '../../helpers';


@Directive({
  selector: '[applicatureContentBody]',
  exportAs: 'applicatureContentBody',
  providers: [ ApplicatureBlockScrollHelperService ]
})
export class ApplicatureContentBodyDirective implements AfterViewInit, OnDestroy {
  private _embeddedViewRef: EmbeddedViewRef<any>;

  constructor(private _templateRef: TemplateRef<any>,
              private _viewContainerRef: ViewContainerRef,
              @Inject(DOCUMENT) private _document: Document,
              private _blockScrollHelperService: ApplicatureBlockScrollHelperService) {
  }

  ngAfterViewInit(): void {
    this._embeddedViewRef = this._viewContainerRef.createEmbeddedView(this._templateRef);
    this._embeddedViewRef.detectChanges();

    this._embeddedViewRef.rootNodes.forEach(node => this._document.body.appendChild(node));

    this._blockScrollHelperService.lockScroll();
  }

  public destroy(): void {
    this._blockScrollHelperService.unLockScroll();
    this._embeddedViewRef.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}
