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

import { W3sDialogComponent } from '../../dialog.component';
import { W3sDialogConfig } from '../../dialog-config';
import { W3sDialogInjector } from '../../dialog-injector';
import { W3sDialogRef } from '../../dialog-ref';


@Injectable()
export class W3sDialogService {
  private _dialogComponentRef: ComponentRef<W3sDialogComponent>;

  private get _appRef(): ApplicationRef {
    return this._injector.get(ApplicationRef);
  }

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    @Inject(Injector) private readonly _injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  /** @internal */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private appendDialogComponentToBody<R = any>(config: W3sDialogConfig): W3sDialogRef<R> {
    const map = new WeakMap();
    map.set(W3sDialogConfig, config);

    const dialogRef = new W3sDialogRef<R>();
    map.set(W3sDialogRef, dialogRef);

    const afterClosedSub = dialogRef.afterClosed
      .subscribe(() => {
        this.removeDialogComponentFromBody();
        afterClosedSub.unsubscribe();
      });

    const componentFactory: ComponentFactory<W3sDialogComponent> =
      this._componentFactoryResolver.resolveComponentFactory<W3sDialogComponent>(W3sDialogComponent);
    const componentRef: ComponentRef<W3sDialogComponent> = componentFactory.create(new W3sDialogInjector(this._injector, map));

    this._appRef.attachView(componentRef.hostView);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
   * @param config - configuration for the dialog window. More details {@link W3sDialogConfig}.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public open<T = any, D = any, R = any>(componentType: Type<T>, config: W3sDialogConfig<D>): W3sDialogRef<Type<R>> {
    const dialogRef: W3sDialogRef<Type<R>> = this.appendDialogComponentToBody<Type<R>>(config);

    this._dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }
}
