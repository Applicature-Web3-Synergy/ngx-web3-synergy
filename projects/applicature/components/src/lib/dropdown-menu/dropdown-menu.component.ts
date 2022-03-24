import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';

import {
  AucContentBodyDirective,
  AucTriggerDirective
} from '../directives';
import { AUC_POSITIONS } from '../enums';
import { AucDropdownConfig, AucDropdownPositionStyles } from './interfaces';


@Component({
  selector: 'auc-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: [ './dropdown-menu.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucDropdownMenuComponent implements AfterViewInit, OnDestroy {
  @Input() config?: AucDropdownConfig;
  @Input() trigger!: AucTriggerDirective;
  @ViewChild(AucContentBodyDirective) contentBody: AucContentBodyDirective;
  @ViewChild('dropdown', { read: ElementRef }) dropdownRef: ElementRef;

  public positionStyles: AucDropdownPositionStyles = null;
  public isBelow: boolean;
  public isAfter: boolean;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  @HostListener('window:resize') onResize(): void {
    this.getPositions();
  }

  ngAfterViewInit(): void {
    if (this.dropdownRef) {
      this.getPositions();
    }
  }

  ngOnDestroy() {
    this.close();
  }

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
    let leftPosition = isAfter
      ? left
      : right - (!maxWidth || dropdownWidth > maxWidth ? dropdownWidth : maxWidth);

    const styles: AucDropdownPositionStyles = {
      top: `${topPosition <= 0 ? 0 : topPosition}px`,
      left: `${leftPosition <= 0 ? 0 : leftPosition}px`
    }

    if (!!maxHeight) {
      styles.maxHeight = `${maxHeight}px`
    }

    if (!!maxWidth) {
      styles.maxWidth = `${maxWidth}px`
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
