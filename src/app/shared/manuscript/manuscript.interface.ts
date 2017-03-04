export interface IManuscript {
  pk: number;
  name: string;
  category: number;
  items: IManuscriptItem[];
  promises: IManuscriptPromise[];
  links: {
    base: string;
    more: string;
  };
  images: {
    correct: string[];
    wrong: string[];
  };
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

export type ManuscriptPromiseStatus = "fulfilled" | "broken";