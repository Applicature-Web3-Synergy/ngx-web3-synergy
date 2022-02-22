import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';

import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { InsertionDirective } from './directives';
import { CustomizeDialogConfig } from './interfaces/index';


@Component({
  selector: 'applicature-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  private readonly _onClose = new Subject<any>();

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public onClose = this._onClose.asObservable();
  public panelConfig: CustomizeDialogConfig;
  public overlayConfig: CustomizeDialogConfig;
  public dialogConfig: CustomizeDialogConfig = {};

  @ViewChild(InsertionDirective) insertionPoint: InsertionDirective;

  public get hasOverlay(): boolean {
    return (this._config?.overlay?.hasOverlay ?? null) === null ? true : this._config.overlay.hasOverlay;
  }

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _cdr: ChangeDetectorRef,
              private _config: DialogConfig,
              private _dialogRef: DialogRef,
              @Inject(DOCUMENT) private document: Document) {
    this.mapConfig(this._config);
    this.document.body.classList.add('block-scroll');
  }

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this._cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('block-scroll');

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private mapConfig(config: DialogConfig): void {
    if (!config) {
      return;
    }

    const { panel, overlay, width, height, minWidth, minHeight, maxWidth, maxHeight, position, dialogClass } = config;

    if (panel?.panelClass) {
      this.panelConfig = {
        classes: panel.panelClass
      };
    }

    if (overlay?.hasOverlay && overlay?.overlayClass.length) {
      this.overlayConfig = {
        classes: overlay.overlayClass
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
      this._dialogRef.close(undefined);
    }
  }

  public loadChildComponent(componentType: Type<any>): void {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent<any>(componentFactory);
  }
}
