import { TPromise } from "../promise/promise.types";

export type TManuscript = {
  pk: number;
  name: string;
  category: number;
  default: string;
  is_first_in_category: boolean;
  items: TManuscriptItem[];
  next: string;
  type: string;
  updated: string;
  url: string;
  voter_guide_alternatives: TManuscriptVoterGuideAlternative[];
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

export type TManuscriptVoterGuideAlternative = {
  full_promises: TPromise[];
  no_answer: boolean;
  parties: string[];
  pk: number;
  promises: number[];
  text: string;
}