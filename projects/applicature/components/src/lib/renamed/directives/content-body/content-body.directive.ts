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

import { AucBlockScrollHelperService } from '../../../helpers';


@Directive({
  selector: '[aucContentBody]',
  exportAs: 'aucContentBody',
  providers: [ AucBlockScrollHelperService ]
})
export class AucContentBodyDirective implements AfterViewInit, OnDestroy {
  private _embeddedViewRef: EmbeddedViewRef<any>;

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
