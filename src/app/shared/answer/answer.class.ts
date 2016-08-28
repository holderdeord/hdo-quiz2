import { Promise } from '../promise';

export class Answer {
  private _response: boolean;

  public get response(): boolean {
    return this._response;
  }

  constructor(private promise: Promise) {
  }

  hadCorrectResponse(): boolean {
    if (!this._response === undefined) {
      throw new Error('No _response given yet');
    }
    return this._response === this.promise.kept;
  }

  setResponse(response: boolean): boolean {
    this._response = response;
    return this._response === this.promise.kept;
  }
}