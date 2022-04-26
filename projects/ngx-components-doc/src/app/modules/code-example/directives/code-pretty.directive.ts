import { AfterViewInit, Directive, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import 'code-prettify/loader/run_prettify';


@Directive({
  selector: '[docCodePretty]',
  exportAs: 'docCodePretty'
})
export class CodePrettyDirective implements AfterViewInit {
  private window: Window & { PR: any };

  constructor(@Inject(DOCUMENT) private document: Document
  ) {
    this.window = this.document.defaultView as any;
  }

  ngAfterViewInit(): void {
    this.prettyPrint();
  }

  public prettyPrint(): void {
    setTimeout(() => {
      this.window?.PR?.prettyPrint();
    }, 100);
  }
}
