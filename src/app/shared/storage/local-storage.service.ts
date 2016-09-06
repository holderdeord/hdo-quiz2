import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor(private _window: Window) {
  }

  clearStorage(name: string): void {
    window.localStorage.removeItem(name);
  }

  setupStorage(name: string, defaultValue: any): Function {
    let window = this._window;
    return function () {
      let args = Array.prototype.slice.call(arguments);
      if (args.length > 1) {
        let value = args.pop();
        let data = createObject({}, args, value);
        window.localStorage.setItem(name, JSON.stringify(data));
      } else if (args.length) {
        window.localStorage.setItem(name, JSON.stringify(args[0]));
      } else {
        let data = window.localStorage.getItem(name);
        return data === null ? defaultValue : JSON.parse(data);
      }
    };
  }
}

function createObject(data: any, paths: any[], value: any) {
  if (paths.length > 0) {
    let path = paths.shift();
    data[path] = createObject({}, paths, value);
  } else {
    return value;
  }
  return data;
}
