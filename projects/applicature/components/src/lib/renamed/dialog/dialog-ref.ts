import { Observable, Subject } from 'rxjs';

export class AucDialogRef<R = any> {
  private readonly _afterClosed = new Subject<R>();
  private readonly _afterOpened = new Subject<null>();

  /**
   * {@link afterClosed} - emits after dialog was closed.
   * You can add subscription for it if needed. this.dialogRed.afterClosed.subscribe();
   */
  public afterClosed: Observable<any> = this._afterClosed.asObservable();

  /**
   * {@link afterOpened} - emits after dialog was opened.
   * You can add subscription for it if needed. this.dialogRed._afterOpened.subscribe();
   */
  public afterOpened: Observable<null> = this._afterOpened.asObservable();

  /**
   * {@link close} - emits close dialog action the dialog window.
   * @param result - the value which will be emitted for afterClosed action.
   */
  public close(result?: R): void {
    this._afterClosed.next(result);
  }

  /**
   * {@link open} - emits open dialog action the dialog window.
   * You mustn't use it. It's already used inside injection strategy.
   */
  public open(): void {
    this._afterOpened.next(null);
  }
}
