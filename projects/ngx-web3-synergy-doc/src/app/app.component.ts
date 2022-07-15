import { ChangeDetectionStrategy, Component, HostListener, Inject, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

import { MatSidenav } from '@angular/material/sidenav/sidenav';
import { BaseSubscriber } from '@applicature/ngx-web3-synergy';

import { RouterHelperService } from './services/router-helper';


@Component({
  selector: 'doc-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseSubscriber {
  public currentPageTitle$: Observable<string> = this.routerHelperService.currentPageTitle$;
  public isMobile = false;
  private resize$: Subject<void> = new Subject();

  @ViewChild('sidenav') sidenav: MatSidenav;

  @HostListener('window:resize')
  public onResize(): void {
    this.resize$.next();
  }

  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router,
              private routerHelperService: RouterHelperService
  ) {
    super();
    this.checkIsMobile();

    this.router.events
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filter((event: any) => event instanceof NavigationEnd),
        takeUntil(this.notifier)
      )
      .subscribe((e: NavigationEnd) => {
        this.routerHelperService.activeUrl = e.url;

        if ( this.isMobile ) {
          this.sidenav.opened = false;
        }
      });

    this.resize$
      .pipe(takeUntil(this.notifier))
      .subscribe(() => {
        this.checkIsMobile();
      });
  }

  checkIsMobile(startMobileWidth = 959): void {
    this.isMobile = (document?.body?.offsetWidth || 0) <= startMobileWidth;
  }
}
