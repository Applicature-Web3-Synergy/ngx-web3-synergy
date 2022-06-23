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

import { AucBlockScrollHelperService } from '../../helpers';


@Directive({
  selector: '[aucContentBody]',
  exportAs: 'aucContentBody',
  providers: [ AucBlockScrollHelperService ]
})
export class AucContentBodyDirective implements AfterViewInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _embeddedViewRef: EmbeddedViewRef<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private _templateRef: TemplateRef<any>,
              private _viewContainerRef: ViewContainerRef,
              @Inject(DOCUMENT) private _document: Document,
              private _blockScrollHelperService: AucBlockScrollHelperService) {
  }

  ngAfterViewInit(): void {
    this._embeddedViewRef = this._viewContainerRef.createEmbeddedView(this._templateRef);
    this._embeddedViewRef.detectChanges();

    this._embeddedViewRef.rootNodes.forEach(node => this._document.body.appendChild(node));

    this._blockScrollHelperService.lockScroll();
  }

  public destroy(): void {
    this._blockScrollHelperService.unlockScroll();
    this._embeddedViewRef.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}
