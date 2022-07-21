/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import { Type } from '@angular/core';

import { W3sDialogConfig, W3sDialogRef } from '../../../../dialog';

export class W3sDialogServiceMock {
  public open<T = any, D = any, R = any>(componentType: Type<T>, config: W3sDialogConfig<D>): W3sDialogRef<Type<R>> {
    const dialogRef = new W3sDialogRef();
    dialogRef.open();

    return dialogRef;
  }
}
