import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export abstract class BaseSubscriber implements OnDestroy {
  notifier = new Subject();

  // don't forget to call super.ngOnDestroy() if you want to use inside your component ngOnDestroy()
  /** @internal */
  ngOnDestroy(): void {
    this.notifier.next(null);
    this.notifier.complete();
  }
}
