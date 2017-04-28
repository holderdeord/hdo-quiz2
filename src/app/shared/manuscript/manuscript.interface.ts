import { IManuscriptsItem } from '..';

export interface IManuscript extends IManuscriptsItem {
  items: IManuscriptItem[];
  promises: IManuscriptPromise[];
  images: IManuscriptImage[];
  random: IManuscriptRandom;
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

export interface IManuscriptRandom {
  selection: number;
  links: IManuscriptRandomLinks;
  texts: IManuscriptRandomTexts;
  items: IManuscriptRandomItem[];
}

export interface IManuscriptRandomLinks {
  next: string;
}

export interface IManuscriptRandomTexts {
  introduction: string;
  followup: string;
  more: string;
  end: string;
}

export interface IManuscriptRandomItem {
  id: number;
  text: string;
}