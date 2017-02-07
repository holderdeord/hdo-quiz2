import {Alternative, Question} from '..';

export class Response {
  constructor(public question: Question, public answer: Alternative) {
  }

  public get wasCorrect(): boolean {
    return this.question.kept === this.answer.value;
  }
}
