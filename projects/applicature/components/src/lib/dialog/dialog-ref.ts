import { Observable, Subject } from 'rxjs';

export class AucDialogRef<R = any> {
  private readonly _afterClosed = new Subject<R>();
  private readonly _afterOpened = new Subject<null>();

  /**
   * Emits after dialog was closed. <br>
   * You can add subscription for it if needed. this.dialogRed.afterClosed.subscribe();
   */
  public afterClosed: Observable<any> = this._afterClosed.asObservable();

  /**
   * Emits after dialog was opened. <br>
   * You can add subscription for it if needed. this.dialogRed._afterOpened.subscribe();
   */
  public afterOpened: Observable<null> = this._afterOpened.asObservable();

  /**
   * Emits close dialog action the dialog window. <br>
   * @param result - the value which will be emitted for afterClosed action.
   */
  public close(result?: R): void {
    this._afterClosed.next(result);
  }

  /**
   * @internal
   * Emits open dialog action the dialog window. <br>
   * You mustn't use it. It's already used inside injection strategy.
   */
  public open(): void {
    this._afterOpened.next(null);
  }
}
