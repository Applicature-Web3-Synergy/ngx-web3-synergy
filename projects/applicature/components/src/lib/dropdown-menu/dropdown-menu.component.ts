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

import { debounceTime, Subject, takeUntil } from 'rxjs';

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
  @Input() config?: AucDropdownConfig;
  @Input() trigger!: AucTriggerDirective;
  @ViewChild(AucContentBodyDirective) contentBody: AucContentBodyDirective;
  @ViewChild('dropdown', { read: ElementRef }) dropdownRef: ElementRef;

  public positionStyles: AucDropdownPositionStyles = null;
  public isBelow: boolean;
  public isAfter: boolean;
  private resize$: Subject<void> = new Subject();

  constructor(private _cdr: ChangeDetectorRef) {
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

  @HostListener('window:resize') onResize(): void {
    this.resize$.next();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config?.currentValue && !this.positionStyles && (this.config?.minWidth || this.config?.minHeight)) {
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
    }
  }

  ngAfterViewInit(): void {
    if (this.dropdownRef) {
      this.getPositions();
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.close();
  }

  public getPositions(): void {
    console.log('getPositions');
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
    let leftPosition = isAfter
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

    this.positionStyles = styles;
    this.isBelow = isBelow;
    this.isAfter = isAfter;

    this._cdr.detectChanges();
  }

  public close(): void {
    if (!this.contentBody) {
      return;
    }

    this.trigger.showHide(false);

    this.contentBody.destroy();
  }
}
