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

import { W3sDialogConfig } from './dialog-config';
import { W3sDialogRef } from './dialog-ref';
import { W3sInsertionDirective } from './directives';
import { W3sCustomizeDialogConfig } from './interfaces';
import { W3sOverlayCustomizationConfig } from '../overlay';
import { W3sBlockScrollHelperService } from '../helpers';


@Component({
  selector: 'w3s-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sDialogComponent implements AfterViewInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _onClose = new Subject<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public componentRef: ComponentRef<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public childComponentType: Type<any>;
  public onClose = this._onClose.asObservable();
  public panelConfig: W3sCustomizeDialogConfig;
  public overlayConfig: W3sOverlayCustomizationConfig;
  public dialogConfig: W3sCustomizeDialogConfig = {};

  @ViewChild(W3sInsertionDirective) insertionPoint: W3sInsertionDirective;

  public get hasOverlay(): boolean {
    return (this._config?.overlay?.hasOverlay ?? null) === null ? true : this._config.overlay.hasOverlay;
  }

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _cdr: ChangeDetectorRef,
              private _config: W3sDialogConfig,
              private _dialogRef: W3sDialogRef,
              private _blockScroll: W3sBlockScrollHelperService) {
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

  private mapConfig(config: W3sDialogConfig): void {
    if (!config) {
      return;
    }

    const { panel, overlay, width, height, minWidth, minHeight, maxWidth, maxHeight, position, dialogClass } = config;

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public loadChildComponent(componentType: Type<any>): void {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.componentRef = viewContainerRef.createComponent<any>(componentFactory);
  }
}
