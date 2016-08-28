import { Injectable } from '@angular/core';

import { IStack } from './stack.interface';
import { IPromise } from '../promise/promise.interface';
import { Promise } from '../promise/promise.class';
import { Answer } from '../answer';

@Injectable()
export class Stack implements IStack {
  private _answers: Answer[];
  private _current: Promise;
  private _index: number;
  private _promises: IPromise[];
  private _state: StackState;

  public get answers(): Answer[] { return this._answers; }
  public get current(): Promise { return this._current; }
  public get index(): number { return this._index; }
  public get promises(): Promise[] { return this._promises; }
  public get state(): StackState { return this._state; }

  constructor(public id: number, public name: string) {
    this._promises = [];
    this._current = null;
    this._answers = [];
    this._state = StackState.NotStarted;
  }

  addPromise(promise: Promise): void {
    if (this.state !== StackState.NotStarted) {
      throw new Error('Quiz is started');
    }
    this._promises.push(promise);
    this._answers.push(new Answer(promise));
  }

  getNumberOfCorrectResponses(): number {
    return this._answers.reduce((total, answer) => total += answer.hadCorrectResponse() ? 1 : 0, 0);
  }

  getNumberOfQuestions(): number {
    return this._promises.length;
  }

  getNumberOfResponses(): number {
    return this._answers.filter(answer => answer.response !== undefined).length;
  }

  getResponses(): boolean[] {
    return this._answers.map(answer => answer.response);
  }

  getResponsesAsString(): string {
    return this._answers
      .filter(answer => answer.response !== undefined)
      .map(answer => answer.response ? '1' : '0')
      .join('');
  }

  setResponse(response: boolean): boolean {
    if (this.state === StackState.NotStarted) {
      throw new Error('Have not started quiz yet');
    }
    if (this.state === StackState.Complete) {
      throw new Error('There are no question to set response to');
    }
    let correctAnswer = this._answers[this._index].setResponse(response);
    this._advance();
    return correctAnswer;
  }

  startQuiz(responses: boolean[]): Stack {
    responses.forEach((response, index) => this._answers[index].setResponse(response));
    this._state = responses.length === this._answers.length ?
      StackState.Complete :
      StackState.InProgress;
    this._index = responses.length;
    this._current = this._promises[this._index] ? this._promises[this._index] : null;
    return this;
  }

  private _advance(): void {
    this._index = this._index === undefined ? 0 : this._index + 1;
    if (this._promises[this._index]) {
      this._current = this._promises[this._index];
    } else {
      this._state = StackState.Complete;
    }
  }
}

export enum StackState {
  NotStarted,
  InProgress,
  Complete
};
