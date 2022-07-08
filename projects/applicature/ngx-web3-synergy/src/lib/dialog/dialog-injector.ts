import { Injector, Type, InjectionToken, InjectFlags } from '@angular/core';


export class W3sDialogInjector implements Injector {
  constructor(
    private _parentInjector: Injector,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _additionalTokens: WeakMap<any, any>
  ) {
  }

  get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(token: any, notFoundValue?: any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T>(token: any, notFoundValue?: any): T {
    const value = this._additionalTokens.get(token);

    if (value) {
      return value;
    }

    return this._parentInjector.get<T>(token, notFoundValue);
  }
}
