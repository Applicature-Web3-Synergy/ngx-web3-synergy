/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */

import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class W3sLocalStorageService {
  public isAvailable = false;
  private readonly _localStorage: Storage;
  private emptyStorage: Storage = {
    getItem(key: string): string | null {
      return '';
    },
    setItem(key: string, value: string): void {
    },
    removeItem(key: string): void {
    },
    clear(): void {
    },
    key(index: number): string | null {
      return null;
    },
    length: 0,
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: string
  ) {

    if (isPlatformBrowser(this.platformId)) {
      try {
        if (localStorage) {
          this._localStorage = localStorage;
          this.isAvailable = true;
        }
      } catch (err) {
        console.error('Local storage is disabled!');
      }
    }

    if (!this._localStorage) {
      this._localStorage = this.emptyStorage;
    }
  }

  public getItem(key: string): string | null {
    const item = this._localStorage.getItem(key);
    let obj: string | null;

    try {
      obj = item;
    } catch (err) {
      // empty
    }

    return (obj !== undefined ? obj : item) || null;
  }

  public setItem(key: string, value: string): void {
    this._localStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    this._localStorage.removeItem(key);
  }

  public clear(): void {
    this._localStorage.clear();
  }
}
