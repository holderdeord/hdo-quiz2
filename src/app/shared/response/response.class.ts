import { Alternative, Question } from '..';

export class Response<T> {
  public answers: Alternative<T>[] = [];

  constructor(public question: Question<T>, answer?: Alternative<T>) {
    if (answer) {
      this.answers = [answer];
    }
  }

  public addAnswer(answer: Alternative<T>) {
    this.answers.push(answer);
  }

  public get wasCorrect(): boolean {
    return this.answers.some(answer => this.question.isCorrectAnswer(answer.value));
  }
}
