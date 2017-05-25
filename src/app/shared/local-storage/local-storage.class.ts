export class LocalStorage {
  constructor(private localStorage: Storage, public name: string, ...rest: any[]) {
    if (rest.length > 0) {
      this.set.apply(rest);
    }
  }

  private createObject(data: any, paths: any[], value: any) {
    if (paths.length > 0) {
      let path = paths.shift();
      data[path] = this.createObject({}, paths, value);
    } else {
      return value;
    }
    return data;
  }

  public get(...args: any[]): any {
    const data = this.localStorage.getItem(this.name);
    return this.traverseObject(JSON.parse(data), args);
  }

  private traverseObject(data: any, paths: any[]) {
    if (paths.length > 0) {
      let path = paths.shift();
      return this.traverseObject(data[path], paths);
    }
    return data;
  }

  public set(...args: any[]): void {
    if (args.length > 1) {
      let value = args.pop();
      let data = this.createObject({}, args, value);
      this.localStorage.setItem(this.name, JSON.stringify(data));
    } else if (args.length) {
      this.localStorage.setItem(this.name, JSON.stringify(args[0]));
    }
  }
}