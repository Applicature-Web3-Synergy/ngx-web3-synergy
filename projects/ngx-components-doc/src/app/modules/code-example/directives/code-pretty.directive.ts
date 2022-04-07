import { AfterViewInit, Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import 'code-prettify/loader/run_prettify';


@Directive({
  selector: '[docCodePretty]',
  exportAs: 'docCodePretty'
})
export class CodePrettyDirective implements AfterViewInit {
  private window: Window & { PR: any };

  constructor(private _renderer2: Renderer2,
              private _elementRef: ElementRef,
              @Inject(DOCUMENT) private document: Document
  ) {
    this.window = this.document.defaultView as any;
  }

  ngAfterViewInit(): void {
    this.window?.PR?.prettyPrint();
  }
}
