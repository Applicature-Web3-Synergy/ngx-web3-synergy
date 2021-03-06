import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { W3sCustomClassDirective } from '../custom-class';


@Directive({
  selector: '[w3sTrigger]',
  exportAs: 'w3sTrigger'
})
export class W3sTriggerDirective {
  /**
   * You can customize element when opened status. <br>
   * It's an optional parameter. <br>
   * By default, used w3s-trigger-opened.
   */
  @Input()
  public triggerClass?: string = 'w3s-trigger-opened';

  /**
   * Emits show/hide state.  <br>
   * If opened - true. <br>
   * If closed - false.
   */
  @Output()
  public showHide: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** @internal */
  private _customClass: W3sCustomClassDirective;

  /** @internal */
  private _isOpened = false;

  /**
   * Emits opened status. <br>
   * You can subscribe on it.
   */
  public opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isOpened);

  /** @returns is opened */
  public get opened(): boolean {
    return this._isOpened;
  }

  /** @internal */
  private set _opened(opened: boolean) {
    this._isOpened = opened;
    this.opened$.next(this.opened);
    this.showHide.emit(this.opened);
  }

  /** @internal */
  @HostListener('click', [ '$event' ]) onClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();

    this.showHideStatus();
  }

  /** @internal */
  public get nativeElement() {
    return this._elementRef?.nativeElement;
  }

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
    this._customClass = new W3sCustomClassDirective(this._renderer2, this._elementRef);
  }

  /**
   * Sets show or hide status.
   * @param isOpen: isOpened status.
   */
  public showHideStatus(isOpen?: boolean): void {
    if ((isOpen ?? null) !== null) {
      this._opened = isOpen;
    } else {
      this._opened = !this._opened;
    }

    if (this._customClass) {
      if (this.opened) {
        this._customClass.setClasses([ this.triggerClass ]);

        return;
      }

      this._customClass.removeClasses([ this.triggerClass ]);
    }
  }

}
