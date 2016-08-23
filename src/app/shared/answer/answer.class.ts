import { Promise } from '../promise';

export class Answer {
  private answer: boolean;

  constructor(private promise: Promise) {

  }

  giveAnswer(answer: boolean) {
    this.answer = answer;
    return this.answer === this.promise.kept; 
  }

  hadCorrectAnswer() {
    if (!this.answer === undefined) {
      throw new Error('No answer given yet');
    }
    return this.answer === this.promise.kept; 
  }
}