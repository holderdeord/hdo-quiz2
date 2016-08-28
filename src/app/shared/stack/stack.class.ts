import { Injectable } from '@angular/core';
import { IStack } from './stack.interface';
import { IPromise } from '../promise/promise.interface';
import { Promise } from '../promise/promise.class';
import { Answer } from '../answer';

@Injectable()
export class Stack implements IStack {
  private _answers: Answer[];
  public current: Promise;
  public promises: IPromise[];

  private _index: number;
  private _state: StackState;

  public get answers() : Answer[] {
    return this._answers;
  }

  public get state() : StackState {
    return this._state;
  }

  constructor(public id: number, public name: string) {
    this.promises = [];
    this.current = null;
    this._answers = [];
    this._state = StackState.Setup;
  }

  addPromise(promise: Promise) : void {
    if (this.state !== StackState.Setup) {
      throw new Error('Quiz is started');
    }
    this.promises.push(promise);
    this._answers.push(new Answer(promise));
  }

  getNumberOfCorrectAnswers() : number {
    return this._answers.reduce((total, answer) => total += answer.hadCorrectAnswer() ? 1 : 0, 0);
  }

  getResponses() : boolean[] {
    return this._answers.map(answer => answer.response);
  }

  giveAnswer(answer: boolean) : boolean {
    if (this.state === StackState.Setup) {
      throw new Error('Have not started quiz yet');
    }
    if (this.state === StackState.Complete) {
      throw new Error('There are no question to answer');
    }
    let correctAnswer = this._answers[this._index].giveAnswer(answer);
    this._advance();
    return correctAnswer;
  }

  giveAnswers(answers: boolean[]) : Stack {
    answers.forEach(answer => this.giveAnswer(answer));
    return this;
  }

  startQuiz() : Stack {
    this._state = StackState.InProgress;
    this._advance();
    return this;
  }

  private _advance() : void {
    this._index = this._index === undefined ? 0 : this._index + 1;
    if (this.promises[this._index]) {
      this.current = this.promises[this._index];
    } else {
      this._state = StackState.Complete;
    }
  }
}

export enum StackState {
  Setup,
  InProgress,
  Complete
};