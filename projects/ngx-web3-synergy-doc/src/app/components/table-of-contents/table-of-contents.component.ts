import { ViewportScroller } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TableOfContents } from './interfaces';


@Component({
  selector: 'doc-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentComponent {
  @Input()
  public configContent?: TableOfContents[];

  public rootUrl = this.router.url.split('#')[0];
  public fragment!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    const headerHeight = 100;
    viewportScroller.setOffset([0, headerHeight]);

    this.route.fragment.subscribe((fragment: string) => {
      if (fragment) {
        this.fragment = fragment;
      }
    });
  }

  scrollToElement(element: string): void {
    this.router.navigate([this.rootUrl], { fragment: element });
    this.viewportScroller.scrollToAnchor(element);
  }
}
