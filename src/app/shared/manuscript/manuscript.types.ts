export type TManuscript  = {
  pk: number;
  name: string;
  category: number;
  links: TManuscriptLinks;
  electoralGuide: TManuscriptElectoralGuide;
  items: TManuscriptItem[];
  images: TManuscriptImage[];
  promises: TManuscriptPromise[];
  random: TManuscriptRandom;
};

export type TManuscriptLinks = {
  next: string;
};

export type TManuscriptElectoralGuide = {

};

export type TManuscriptItem = {
  pk: number;
  type: string;
  order: number;
  text: string;
  reply_action_1: number;
  reply_action_2: number;
  reply_action_3: number;
  reply_text_1: string;
  reply_text_2: string;
  reply_text_3: string;
};

export type TManuscriptPromise = {
  pk: number;
  body: string;
  status: TManuscriptPromiseStatus,
  categories: string[]
};

export type TManuscriptImage = {
  url: string;
  type: TManuscriptPromiseStatus;
};

export type TManuscriptPromiseStatus = 'fulfilled' | 'broken';

export type TManuscriptRandom = {
  selection: number;
  links: TManuscriptRandomLinks;
  texts: TManuscriptRandomTexts;
  items: TManuscriptRandomItem[];
};

export type TManuscriptRandomLinks = {
  next: string;
};

export type TManuscriptRandomTexts = {
  introduction: string;
  followup: string;
  more: string;
  end: string;
};

export type TManuscriptRandomItem = {
  id: number;
  text: string;
  links?: TManuscriptRandomItemLinks;
};

export type TManuscriptRandomItemLinks = {
  next: string;
};
