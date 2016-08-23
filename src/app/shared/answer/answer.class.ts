import { Promise } from '../promise';

export class Answer {
  private _response: boolean;

  public get response(): boolean {
    return this._response;
  }

  constructor(private promise: Promise) {
  }

  giveAnswer(response: boolean): boolean {
    this._response = response;
    return this._response === this.promise.kept;
  }

  hadCorrectAnswer(): boolean {
    if (!this._response === undefined) {
      throw new Error('No _response given yet');
    }
    return this._response === this.promise.kept;
  }
}