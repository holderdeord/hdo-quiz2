import { Alternative } from '..';

export class Question {
  public alternatives: Alternative[] = [];

  constructor(public text: string, public answer: boolean) {}

  public addAlternative(alternative: Alternative) {
    this.alternatives.push(alternative);
  }
}
