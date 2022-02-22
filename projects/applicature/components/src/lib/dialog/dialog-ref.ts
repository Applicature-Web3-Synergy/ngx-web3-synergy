import { Observable, Subject } from 'rxjs';

export class DialogRef<R = any> {
  private readonly _afterClosed = new Subject<R>();
  private readonly _afterOpened = new Subject<null>();

  public afterClosed: Observable<any> = this._afterClosed.asObservable();
  public afterOpened: Observable<null> = this._afterOpened.asObservable();

  close(result?: R): void {
    this._afterClosed.next(result);
  }

  open(): void {
    this._afterOpened.next(null);
  }
}
