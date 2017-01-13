import { Alternative } from '..';

export class Question {
  public alternatives: Alternative[] = [];

  constructor(public text: string, public kept: boolean) {}

  public addAlternative(alternative: Alternative) {
    this.alternatives.push(alternative);
  }
}
