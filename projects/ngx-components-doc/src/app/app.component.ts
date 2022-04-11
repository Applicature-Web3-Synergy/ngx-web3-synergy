import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, takeUntil } from 'rxjs';

import { BaseSubscriber } from '@applicature/components';

import { RouterHelperService } from './services/router-helper/router-helper.service';


@Component({
  selector: 'doc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseSubscriber {
  public currentPageTitle$: Observable<string> = this.routerHelperService.currentPageTitle$;

  constructor(private router: Router, private routerHelperService: RouterHelperService) {
    super();

    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        takeUntil(this.notifier)
      )
      .subscribe((e: NavigationEnd) => this.routerHelperService.activeUrl = e.url);
  }
}
