import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Stack } from './stack.class';
import { Promise } from '../promise/promise.class';

@Injectable()
export class StackService {
  constructor(private http: Http) {

  }

  getStacks() {
    return this.http.get('/assets/stacks.json')
      .map(res => res.json())
      .map(response => {
        return response.map(stackData => {
          const stack = new Stack(stackData.id, stackData.name);
          stackData.promises.forEach(promiseData => {
            stack.addPromise(new Promise(promiseData.body, promiseData.kept));
          });
          return stack;
        });
      });
  }
}