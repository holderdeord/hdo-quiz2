import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Stack } from './stack.class';
import { Promise } from '../promise/promise.class';
import { Observable } from 'rxjs';

@Injectable()
export class StackService {
  constructor(private http: Http) {

  }

  getStacks(): Observable<Stack[]> {
    return this.http.get('/assets/stacks.json')
      .map(res => res.json())
      .map(response => response.map(this.createStack));
  }

  getStack(id: number): Observable<Stack> {
    return this.http.get('/assets/stacks.json')
      .map(res => res.json())
      .flatMap(response => response.filter(stack => stack.id === id))
      .map(this.createStack);
  }

  private createStack(stackData: any): Stack {
    const stack = new Stack(stackData.id, stackData.name);
    stackData.promises.forEach(promiseData => {
      stack.addPromise(new Promise(promiseData.body, promiseData.kept));
    });
    return stack;
  }
}