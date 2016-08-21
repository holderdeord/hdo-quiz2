import { Injectable } from '@angular/core';
import { IPromise } from './promise.interface';

@Injectable()
export class Promise implements IPromise {
  constructor(public body: string, public kept: boolean) {
  }
}
