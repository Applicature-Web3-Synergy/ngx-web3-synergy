import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { BaseSubscriber } from '../base-subscriber';


@Injectable()
export class AucInstallWalletHelperService extends BaseSubscriber {
  /** Emits URL which uses for redirection to wallet website */
  public redirectTo$: Subject<string> = new Subject<string>();

  constructor() {
    super();

    this.redirectTo$
      .pipe(
        filter((url: string) => !!url),
        takeUntil(this.notifier)
      )
      .subscribe((url: string) => {
        window.open(url, '_blank');

        // When user switched to the web app, need reload page to load metamask provider
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            return;
          }

          window.location.reload();
        }, false);
      });
  }
}
