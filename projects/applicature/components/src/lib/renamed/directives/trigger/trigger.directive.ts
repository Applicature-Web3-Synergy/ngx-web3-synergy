import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AucCustomClassDirective } from '../custom-class';


@Directive({
  selector: '[aucTrigger]',
  exportAs: 'aucTrigger'
})
export class AucTriggerDirective {
  /**
   * {@link triggerClass} - It's an `@Input()` parameter.
   * You can customize element when opened status.
   * This is an optional parameter. By default, used auc-trigger-opened.
   */
  @Input()
  public triggerClass?: string = 'auc-trigger-opened';

  /**
   * {@link onShowHide} - It's an `@Output()` parameter.
   * Emits show/hide state.
   * If opened - true.
   * If closed - false.
   */
  @Output()
  public onShowHide: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _customClass: AucCustomClassDirective;
  private _isOpened: boolean = false;

  public opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isOpened);

  public get opened(): boolean {
    return this._isOpened;
  }

  private set _opened(opened: boolean) {
    this._isOpened = opened;
    this.opened$.next(this.opened);
    this.onShowHide.emit(this.opened);
  }

  @HostListener('click', [ '$event' ]) onClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();

    this.showHide();
  }

  public get nativeElement() {
    return this._elementRef?.nativeElement;
  }

  constructor(private _renderer2: Renderer2, private _elementRef: ElementRef) {
    this._customClass = new AucCustomClassDirective(this._renderer2, this._elementRef);
  }

  public showHide(isOpen?: boolean): void {
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
