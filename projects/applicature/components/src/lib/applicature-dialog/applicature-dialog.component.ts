import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';

import { ApplicatureDialogConfig } from './applicature-dialog-config';
import { ApplicatureDialogRef } from './applicature-dialog-ref';
import { ApplicatureInsertionDirective } from './directives';
import { ApplicatureCustomizeDialogConfig } from './interfaces';
import { AucOverlayCustomizationConfig } from '../renamed/overlay';
import { AucBlockScrollHelperService } from '../helpers';


@Component({
  selector: 'applicature-dialog',
  templateUrl: './applicature-dialog.component.html',
  styleUrls: [ './applicature-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicatureDialogComponent implements AfterViewInit, OnDestroy {
  private readonly _onClose = new Subject<any>();

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public onClose = this._onClose.asObservable();
  public panelConfig: ApplicatureCustomizeDialogConfig;
  public overlayConfig: AucOverlayCustomizationConfig;
  public dialogConfig: ApplicatureCustomizeDialogConfig = {};

  @ViewChild(ApplicatureInsertionDirective) insertionPoint: ApplicatureInsertionDirective;

  public get hasOverlay(): boolean {
    return (this._config?.overlay?.hasOverlay ?? null) === null ? true : this._config.overlay.hasOverlay;
  }

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _cdr: ChangeDetectorRef,
              private _config: ApplicatureDialogConfig,
              private _dialogRef: ApplicatureDialogRef,
              private _blockScroll: AucBlockScrollHelperService) {
    this.mapConfig(this._config);
    this._blockScroll.lockScroll();
  }

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this._dialogRef.open();
    this._cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._blockScroll.unlockScroll();

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private mapConfig(config: ApplicatureDialogConfig): void {
    if (!config) {
      return;
    }

    const {panel, overlay, width, height, minWidth, minHeight, maxWidth, maxHeight, position, dialogClass} = config;

    if (panel?.panelClass) {
      this.panelConfig = {
        classes: panel.panelClass
      };
    }

    if (overlay?.hasOverlay && (overlay?.overlayClass.length || overlay?.transparent)) {
      this.overlayConfig = {
        overlayClass: overlay.overlayClass,
        transparent: overlay.transparent
      };
    }

    if (width) {
      this.dialogConfig.width = config.width;
    }

    if (height) {
      this.dialogConfig.height = config.height;
    }

    if (minWidth) {
      this.dialogConfig.minWidth = config.minWidth;
    }

    if (minHeight) {
      this.dialogConfig.minHeight = config.minHeight;
    }

    if (maxWidth) {
      this.dialogConfig.maxWidth = config.maxWidth;
    }

    if (maxHeight) {
      this.dialogConfig.maxHeight = config.maxHeight;
    }

    if (position) {
      this.dialogConfig.position = config.position;
    }

    if (dialogClass) {
      this.dialogConfig.classes = config.dialogClass;
    }

    if (!Object.keys(this.dialogConfig).length) {
      this.dialogConfig = null;
    }

    this._cdr.markForCheck();
  }

  public onOverlayClicked(): void {
    if (this.hasOverlay && (this._config?.overlay?.closeByClick)) {
      this._dialogRef.close();
    }
  }

  public loadChildComponent(componentType: Type<any>): void {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent<any>(componentFactory);
  }
}
