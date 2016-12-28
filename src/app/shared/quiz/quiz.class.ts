import { Question } from '../question/question.class';
import { Answer } from '../answer';

export class Quiz {
  private _answers: Answer[];
  private _current: Question;
  private _index: number;
  private _questions: Question[];
  private _state: QuizState;

  public get answers(): Answer[] { return this._answers; }
  public get current(): Question { return this._current; }
  public get index(): number { return this._index; }
  public get questions(): Question[] { return this._questions; }
  public get state(): QuizState { return this._state; }

  constructor(public id: number, public name: string) {
    this._questions = [];
    this._current = null;
    this._answers = [];
    this._state = QuizState.NotStarted;
  }

  addQuestion(question: Question): void {
    if (this.state !== QuizState.NotStarted) {
      throw new Error('Quiz is started');
    }
    this._questions.push(question);
    this._answers.push(new Answer(question));
  }

  getNumberOfCorrectResponses(): number {
    return this._answers.reduce((total, answer) => total += answer.hadCorrectResponse() ? 1 : 0, 0);
  }

  getNumberOfQuestions(): number {
    return this._questions.length;
  }

  getResponsesAsString(): string {
    return this._answers
      .filter(answer => answer.response !== undefined)
      .map(answer => answer.response ? '1' : '0')
      .join('');
  }

  setResponse(response: boolean): boolean {
    if (this.state === QuizState.NotStarted) {
      throw new Error('Have not started quiz yet');
    }
    if (this.state === QuizState.Complete) {
      throw new Error('There are no question to set response to');
    }
    let correctAnswer = this._answers[this._index].setResponse(response);
    this._advance();
    return correctAnswer;
  }

  start(responses: boolean[]): Quiz {
    responses.forEach((response, index) => this._answers[index].setResponse(response));
    this._state = responses.length === this._answers.length ?
      QuizState.Complete :
      QuizState.InProgress;
    this._index = responses.length;
    this._current = this._questions[this._index] ? this._questions[this._index] : null;
    return this;
  }

  private _advance(): void {
    this._index = this._index === undefined ? 0 : this._index + 1;
    if (this._questions[this._index]) {
      this._current = this._questions[this._index];
    } else {
      this._state = QuizState.Complete;
    }
  }
}

export enum QuizState {
  NotStarted,
  InProgress,
  Complete
}
