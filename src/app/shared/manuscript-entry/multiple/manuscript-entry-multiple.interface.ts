import { IManuscriptEntry } from '..';

export interface IManuscriptEntryMultiple extends IManuscriptEntry {
  texts: IManuscriptEntryMultipleTexts,
  alternatives: IManuscriptEntryMultipleAlternativeEntry[]
}

export interface IManuscriptEntryMultipleTexts {
  introduction: string;
  followup: string;
  finishButton: string;
  conclusion: string;
}

export interface IManuscriptEntryMultipleAlternativeEntry {
  id: any;
  text: string;
}
