import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import {
  AucContentBodyDirective,
  AucTriggerDirective
} from '../directives';
import { AUC_POSITIONS } from '../enums';
import { AucDropdownConfig, AucDropdownPositionStyles } from './interfaces';
import { BaseSubscriber } from '../helpers';


@Component({
  selector: 'auc-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: [ './dropdown-menu.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucDropdownMenuComponent extends BaseSubscriber implements OnChanges, AfterViewInit, OnDestroy {
  /**
   * Customize dropdown <br>
   * It's an optional parameter.
   */
  @Input()
  public config?: AucDropdownConfig;

  /** Trigger for toggle opens */
  @Input()
  public trigger!: AucTriggerDirective;

  /** @internal */
  @ViewChild(AucContentBodyDirective) public contentBody: AucContentBodyDirective;

  /** @internal */
  @ViewChild('dropdown', { read: ElementRef }) public dropdownRef: ElementRef;

  /** @internal */
  public positionStyles: AucDropdownPositionStyles = null;

  /** @internal */
  public isBelow: boolean;

  /** @internal */
  public isAfter: boolean;

  /** @internal */
  private resize$: Subject<void> = new Subject();

  constructor(private _cdr: ChangeDetectorRef, private _elRef: ElementRef) {
    super();

    this.resize$
      .pipe(
        debounceTime(100),
        takeUntil(this.notifier)
      )
      .subscribe(() => {
        this.getPositions();
      });
  }

  /** @internal */
  @HostListener('window:resize') public onResize(): void {
    this.resize$.next();
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.config?.currentValue && !this.positionStyles
      && (this.config?.minWidth || this.config?.minHeight || this.config?.fullwidth)) {
      this.positionStyles = {
        top: '0',
        left: '0'
      };

      if (this.config?.minHeight) {
        this.positionStyles.minHeight = `${this.config.minHeight}px`;
      }

      if (this.config?.minWidth) {
        this.positionStyles.minWidth = `${this.config.minWidth}px`;
      }

      if (this.config?.fullwidth) {
        this.positionStyles.width = '100%';
      }
    }
  }

  /** @internal */
  ngAfterViewInit(): void {
    if (this.dropdownRef) {
      this.getPositions();
    }
  }

  /** @internal */
  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.close();
  }

  /** @internal */
  public getPositions(): void {
    const triggerRect: DOMRect = this.trigger.nativeElement.getBoundingClientRect();

    if (!triggerRect) {
      this.positionStyles = null;
    }

    const {
      height: dropdownHeight = 0,
      width: dropdownWidth = 0
    } = this.dropdownRef?.nativeElement?.getBoundingClientRect() ?? {};
    const { top, left, bottom, right } = triggerRect;
    const { vertical, horizontal } = this.config?.position ?? {};
    let isBelow: boolean = (vertical ?? AUC_POSITIONS.BELOW) === AUC_POSITIONS.BELOW;
    let isAfter: boolean = (horizontal ?? AUC_POSITIONS.AFTER) === AUC_POSITIONS.AFTER;
    let maxHeight: number = 0;
    let maxWidth: number = 0;

    if (this.dropdownRef?.nativeElement?.getBoundingClientRect()) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const remainderBelowHeight = vh - bottom;
      const remainderAboveHeight = top;
      const isBelowReminderBigger = isBelow
        ? remainderBelowHeight === remainderAboveHeight || remainderBelowHeight > remainderAboveHeight
        : (remainderBelowHeight > remainderAboveHeight);
      const remainderHeight = isBelow ? remainderBelowHeight : remainderAboveHeight;

      if (remainderHeight < dropdownHeight) {
        isBelow = !this.config?.minHeight
          ? isBelowReminderBigger
          : remainderHeight >= this.config?.minHeight ? isBelow : isBelowReminderBigger;
        const maxH: number = isBelow ? remainderBelowHeight : remainderAboveHeight
        maxHeight = dropdownHeight > maxH ? maxH : 0;
      }

      const remainderAfterWidth = vw - left;
      const remainderBeforeWidth = right;
      const isAfterReminderBigger = isAfter
        ? remainderAfterWidth === remainderBeforeWidth || remainderAfterWidth > remainderBeforeWidth
        : (remainderAfterWidth > remainderBeforeWidth);
      const remainderWidth = isAfter ? remainderAfterWidth : remainderBeforeWidth;

      if (dropdownWidth > remainderWidth) {
        isAfter = !this.config?.minWidth
          ? isAfterReminderBigger
          : remainderWidth >= this.config?.minWidth ? isAfter : isAfterReminderBigger;
        const maxW: number = isAfter ? remainderAfterWidth : remainderBeforeWidth
        maxWidth = dropdownWidth > maxW ? maxW : 0;
      }
    }

    let topPosition = isBelow
      ? bottom
      : top - (!maxHeight || dropdownHeight > maxHeight ? dropdownHeight : maxHeight);
    let leftPosition = isAfter || this.config?.fullwidth
      ? left
      : right - (!maxWidth || dropdownWidth > maxWidth ? dropdownWidth : maxWidth);

    const styles: AucDropdownPositionStyles = {
      top: `${topPosition <= 0 ? 0 : topPosition}px`,
      left: `${leftPosition <= 0 ? 0 : leftPosition}px`
    }

    if (!!maxHeight) {
      styles.maxHeight = `${maxHeight}px`;
    }

    if (this.config?.minHeight) {
      styles.minHeight = !maxHeight ? `${this.config.minHeight}px` : `${maxHeight}px`;
    }

    if (!!maxWidth) {
      styles.maxWidth = `${maxWidth}px`;
    }

    if (this.config?.minWidth) {
      styles.minWidth = !maxWidth ? `${this.config.minWidth}px` : `${maxWidth}px`;
    }

    if (this.config?.fullwidth) {
      styles.width = '100%';
      const parentWidth = this._elRef?.nativeElement?.parentNode?.clientWidth;

      if (parentWidth) {
        styles.maxWidth = `${parentWidth}px`;
      }
    }

    this.positionStyles = styles;
    this.isBelow = isBelow;
    this.isAfter = isAfter;

    this._cdr.detectChanges();
  }

  /** Hide dropdown */
  public close(): void {
    if (!this.contentBody) {
      return;
    }

    this.trigger.showHide(false);

    this.contentBody.destroy();
  }
}
