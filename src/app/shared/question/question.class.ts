import { Alternative } from '..';

export class Question<T> {
  public alternatives: Alternative<T>[] = [];

  constructor(public text: string, public answer: T) {}

  public addAlternative(alternative: Alternative<T>) {
    this.alternatives.push(alternative);
  }

  public isCorrectAnswer(answer: T) {
    return this.answer === answer;
  }
}
