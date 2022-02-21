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
  private dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
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

    const componentFactory: ComponentFactory<DialogComponent> = this.componentFactoryResolver.resolveComponentFactory<DialogComponent>(DialogComponent);
    const componentRef: ComponentRef<DialogComponent> = componentFactory.create(new DialogInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;

    const dialogOnCloseSubscription = this.dialogComponentRef.instance.onClose
      .subscribe(() => {
        this.removeDialogComponentFromBody();
        dialogOnCloseSubscription.unsubscribe();
      });

    return dialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }

  public open<T = any>(componentType: Type<T>, config: DialogConfig): DialogRef {
    const dialogRef: DialogRef = this.appendDialogComponentToBody<T>(config);

    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }
}
