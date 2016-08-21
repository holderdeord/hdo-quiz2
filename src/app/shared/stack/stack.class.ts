import { Injectable } from '@angular/core';
import { IStack } from './stack.interface';
import { IPromise } from '../promise/promise.interface';
import { Promise } from '../promise/promise.class';

@Injectable()
export class Stack implements IStack {
  public promises: IPromise[];

  constructor(public id: number, public name: string) {
    this.promises = [];
  }

  addPromise(promise: Promise) {
    this.promises.push(promise);
  }
}
