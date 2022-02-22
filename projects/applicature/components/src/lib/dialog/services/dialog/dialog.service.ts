import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';

import { DialogComponent } from '../../dialog.component';
import { DialogConfig } from '../../dialog-config';
import { DialogInjector } from '../../dialog-injector';
import { DialogRef } from '../../dialog-ref';


@Injectable()
export class DialogService {
  private _dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector
  ) {
  }

  private appendDialogComponentToBody<T = any>(config: DialogConfig): DialogRef {
    const map = new WeakMap();
    map.set(DialogConfig, config);

    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    const afterClosedSub = dialogRef.afterClosed
      .subscribe(() => {
        this.removeDialogComponentFromBody();
        afterClosedSub.unsubscribe();
      });

    const componentFactory: ComponentFactory<DialogComponent> =
      this._componentFactoryResolver.resolveComponentFactory<DialogComponent>(DialogComponent);
    const componentRef: ComponentRef<DialogComponent> = componentFactory.create(new DialogInjector(this._injector, map));

    this._appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this._dialogComponentRef = componentRef;

    const dialogOnCloseSubscription = this._dialogComponentRef.instance.onClose
      .subscribe(() => {
        this.removeDialogComponentFromBody();
        dialogOnCloseSubscription.unsubscribe();
      });

    return dialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this._appRef.detachView(this._dialogComponentRef.hostView);
    this._dialogComponentRef.destroy();
  }

  public open<T = any, D = any>(componentType: Type<T>, config: DialogConfig<D>): DialogRef {
    const dialogRef: DialogRef = this.appendDialogComponentToBody<T>(config);

    this._dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }
}
