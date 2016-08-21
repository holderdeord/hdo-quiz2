import { IPromise } from '../promise/promise.interface';

export interface IStack {
  id: number;
  name: string;
  promises: IPromise[];
}