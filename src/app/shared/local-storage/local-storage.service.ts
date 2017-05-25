import { Injectable } from '@angular/core';
import { LocalStorage } from "./local-storage.class";

@Injectable()
export class LocalStorageService {
  constructor(private _window: Window) {
  }

  clearStorage(name: string): void {
    window.localStorage.removeItem(name);
  }

  setupStorage(name: string, defaultValue: any): LocalStorage {
    let window = this._window;
    return new LocalStorage(window.localStorage, name, defaultValue);
  }
}
