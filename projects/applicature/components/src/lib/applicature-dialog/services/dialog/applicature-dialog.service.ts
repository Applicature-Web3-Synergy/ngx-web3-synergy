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

import { ApplicatureDialogComponent } from '../../applicature-dialog.component';
import { ApplicatureDialogConfig } from '../../applicature-dialog-config';
import { ApplicatureDialogInjector } from '../../applicature-dialog-injector';
import { ApplicatureDialogRef } from '../../applicature-dialog-ref';


@Injectable()
export class ApplicatureDialogService {
  private _dialogComponentRef: ComponentRef<ApplicatureDialogComponent>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  private appendDialogComponentToBody<T = any, R = any>(config: ApplicatureDialogConfig): ApplicatureDialogRef<R> {
    const map = new WeakMap();
    map.set(ApplicatureDialogConfig, config);

    const dialogRef = new ApplicatureDialogRef<R>();
    map.set(ApplicatureDialogRef, dialogRef);

    const afterClosedSub = dialogRef.afterClosed
      .subscribe(() => {
        this.removeDialogComponentFromBody();
        afterClosedSub.unsubscribe();
      });

    const componentFactory: ComponentFactory<ApplicatureDialogComponent> =
      this._componentFactoryResolver.resolveComponentFactory<ApplicatureDialogComponent>(ApplicatureDialogComponent);
    const componentRef: ComponentRef<ApplicatureDialogComponent> = componentFactory.create(new ApplicatureDialogInjector(this._injector, map));

    this._appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);

    this._dialogComponentRef = componentRef;

    const dialogOnCloseSubscription = this._dialogComponentRef.instance.onClose
      .subscribe(() => {
        debugger
        this.removeDialogComponentFromBody();
        dialogOnCloseSubscription.unsubscribe();
      });

    return dialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this._appRef.detachView(this._dialogComponentRef.hostView);
    this._dialogComponentRef.destroy();
  }

  public open<T = any, D = any, R = any>(componentType: Type<T>, config: ApplicatureDialogConfig<D>): ApplicatureDialogRef<Type<R>> {
    const dialogRef: ApplicatureDialogRef<Type<R>> = this.appendDialogComponentToBody<Type<T>, Type<R>>(config);

    this._dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }
}
