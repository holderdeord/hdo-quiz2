import { Question } from '../question';

export class Answer {
  private _response: boolean;

  public get response(): boolean { return this._response; }

  constructor(private question: Question) {
  }

  hadCorrectResponse(): boolean {
    if (!this._response === undefined) {
      throw new Error('No _response given yet');
    }
    return this._response === this.question.answer;
  }

  setResponse(response: boolean): boolean {
    this._response = response;
    return this._response === this.question.answer;
  }
}
