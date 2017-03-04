import { IManuscriptsItem } from '..';

export interface IManuscript extends IManuscriptsItem {
  items: IManuscriptItem[];
  promises: IManuscriptPromise[];
  images: IManuscriptImage[];
}

export interface IManuscriptItem {
  type: string;
  order: number;
  text: string;
}

export interface IManuscriptPromise {
  pk: number;
  body: string;
  status: ManuscriptPromiseStatus,
  categories: string[]
}

export interface IManuscriptImage {
  url: string;
  type: ManuscriptPromiseStatus;
}

export type ManuscriptPromiseStatus = 'fulfilled' | 'broken';