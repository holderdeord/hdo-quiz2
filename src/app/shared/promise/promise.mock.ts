import { Promise } from './promise.class';
import { IPromise } from './promise.interface';

export function mockPromise(): Promise {
  var data = mockPromiseData();
  return new Promise(data.body, data.kept);
}

export function mockPromiseData(): IPromise {
  return {
    'body': 'Holdt',
    'kept': true
  };
}