import {
  AfterViewChecked,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import { BaseSubscriber } from '../../helpers';


@Directive({
  selector: '[w3sCheckElWidth]',
  exportAs: 'w3sCheckElWidth'
})
export class W3sCheckElWidthDirective extends BaseSubscriber implements AfterViewChecked {
  @Input() ignoreSameWidth = true;
  @Output() elWidth: EventEmitter<number> = new EventEmitter<number>();
  private _resize$: Subject<number> = new Subject();
  private _curElWidth = 0;
  private _widthChecked = false;

  private get _elRefWidth(): number {
    return this._elementRef.nativeElement.clientWidth ?? 0;
  }

  @HostListener(`window:resize`)
  onResize() {
    this._resize$.next(this._elRefWidth);
  }

  constructor(private _elementRef: ElementRef) {
    super();
    this._resize$
      .pipe(
        debounceTime(50),
        filter((width: number) => this.ignoreSameWidth ? width !== this._curElWidth : true),
        takeUntil(this.notifier)
      )
      .subscribe(() => {
        this._emitWidth();
      });

  }

  ngAfterViewChecked(): void {
    if (this._elRefWidth === 0 || this._widthChecked) {
      return;
    }

    this._widthChecked = true;
    this._emitWidth();
  }

  private _emitWidth(): void {
    this._curElWidth = this._elRefWidth;
    this.elWidth.emit(this._curElWidth);
  }

}
