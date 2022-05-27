import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  Type
} from '@angular/core';

import { AucDialogComponent } from '../../dialog.component';
import { AucDialogConfig } from '../../dialog-config';
import { AucDialogInjector } from '../../dialog-injector';
import { AucDialogRef } from '../../dialog-ref';


@Injectable()
export class AucDialogService {
  private _dialogComponentRef: ComponentRef<AucDialogComponent>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  /** @internal */
  private appendDialogComponentToBody<T = any, R = any>(config: AucDialogConfig): AucDialogRef<R> {
    const map = new WeakMap();
    map.set(AucDialogConfig, config);

    const dialogRef = new AucDialogRef<R>();
    map.set(AucDialogRef, dialogRef);

    const afterClosedSub = dialogRef.afterClosed
      .subscribe(() => {
        this.removeDialogComponentFromBody();
        afterClosedSub.unsubscribe();
      });

    const componentFactory: ComponentFactory<AucDialogComponent> =
      this._componentFactoryResolver.resolveComponentFactory<AucDialogComponent>(AucDialogComponent);
    const componentRef: ComponentRef<AucDialogComponent> = componentFactory.create(new AucDialogInjector(this._injector, map));

    this._appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);

    this._dialogComponentRef = componentRef;

    const dialogOnCloseSubscription = this._dialogComponentRef.instance.onClose
      .subscribe(() => {
        this.removeDialogComponentFromBody();
        dialogOnCloseSubscription.unsubscribe();
      });

    return dialogRef;
  }

  /** @internal */
  private removeDialogComponentFromBody(): void {
    this._appRef.detachView(this._dialogComponentRef.hostView);
    this._dialogComponentRef.destroy();
  }

  /**
   * Opens dialog window.
   * @param componentType - component which will be shown inside the dialog.
   * @param config - configuration for the dialog window. More details {@link AucDialogConfig}.
   */
  public open<T = any, D = any, R = any>(componentType: Type<T>, config: AucDialogConfig<D>): AucDialogRef<Type<R>> {
    const dialogRef: AucDialogRef<Type<R>> = this.appendDialogComponentToBody<Type<T>, Type<R>>(config);

    this._dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }
}
