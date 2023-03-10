import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input, HostListener, Inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TableOfContents } from './interfaces';
import { debounceTime, fromEvent, takeUntil } from 'rxjs';
import { BaseSubscriber } from '../../../../../applicature/ngx-web3-synergy/src/lib/helpers';


@Component({
  selector: 'doc-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentComponent extends BaseSubscriber {
  @Input()
  public configContent?: TableOfContents[];

  public rootUrl = this.router.url.split('#')[0];
  public fragment!: string;
  navLinks: NodeListOf<HTMLElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document,
  ) {
    super()
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

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scroll$ = fromEvent(event.target, 'scroll');
    scroll$.pipe(
      debounceTime(50),
      takeUntil(this.notifier)
    ).subscribe(() => {
      const headerHeight = 100;
      this.navLinks = this.document.querySelectorAll('.doc-anchor-nav li a');

      const currentPos = this.document.documentElement.scrollTop + headerHeight || document.body.scrollTop + headerHeight;
      const linksArray = Array.from(this.navLinks);

      for (const link of linksArray) {
        const target = this.document.querySelector(link.getAttribute('data-target')) as HTMLElement;

        if (target.offsetTop <= currentPos && (target.offsetTop + target.offsetHeight) > currentPos) {
          this.activateLink(link);
        } else {
          this.deactivateLink(link);
        }
      }
    });
  }

  private activateLink(link: HTMLElement): void {
    link.classList.add('active');
  }

  private deactivateLink(link: HTMLElement): void {
    link.classList.remove('active');
  }
}
