import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { PageTitlesByUrl } from '../../constants';


@Injectable({
  providedIn: 'root'
})
export class RouterHelperService {
  private activeUrl$: Subject<string> = new Subject<string>();
  private activePageTitle$: Subject<string> = new Subject();

  get currentUrl$(): Observable<string> {
    return this.activeUrl$.asObservable();
  }

  get currentPageTitle$(): Observable<string> {
    return this.activePageTitle$.asObservable();
  }

  set activeUrl(url: string) {
    this.activeUrl$.next(url);

    this.setPageTitleByUrl(url);
  }

  public setPageTitleByUrl(url: string): void {
    const title: string = PageTitlesByUrl[(url ?? '').split('#')[0].replace('/', '')];

    this.activePageTitle$.next(title);
  }
}
