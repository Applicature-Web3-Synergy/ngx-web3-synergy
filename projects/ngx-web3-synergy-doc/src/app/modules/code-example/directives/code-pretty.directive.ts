import { AfterViewInit, Directive, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import 'code-prettify/loader/run_prettify';


@Directive({
  selector: '[docCodePretty]',
  exportAs: 'docCodePretty'
})
export class CodePrettyDirective implements AfterViewInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private window: Window & { PR: any };

  constructor(@Inject(DOCUMENT) private document: Document
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.window = this.document.defaultView as any;
  }

  ngAfterViewInit(): void {
    this.prettyPrint();
  }

  public prettyPrint(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setTimeout(() => {
      this.window?.PR?.prettyPrint();
    }, 100);
  }
}
