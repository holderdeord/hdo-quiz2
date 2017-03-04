import { IManuscriptEntry } from '..';

export interface IManuscriptEntryPromises extends IManuscriptEntry {
  links: {
    base: string;
    more: string;
  };
  images: {
    correct: string[];
    wrong: string[];
  };
  promises: IManuscriptEntryPromisesEntry[];
}

interface IManuscriptEntryPromisesEntry {
  id: number;
  body: string;
  kept: boolean;
}