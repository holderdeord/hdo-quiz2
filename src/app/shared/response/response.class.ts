import { Alternative, Question } from '..';

export class Response {
  public answers: Alternative[] = [];

  constructor(public question: Question, answer?: Alternative) {
    if (answer) {
      this.answers = [answer];
    }
  }

  public addAnswer(answer: Alternative) {
    this.answers.push(answer);
  }

  public get wasCorrect(): boolean {
    return this.answers.some(answer => this.question.answer === answer.value);
  }
}
