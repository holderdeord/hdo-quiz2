import { Alternative, Question } from '../..';
import { TChatResponseLinks } from "./chat-response.types";

export class ChatResponse<T> {
  public answers: Alternative<T>[] = [];

  constructor(public question: Question<T>, answer?: Alternative<T>) {
    if (answer) {
      this.answers = [answer];
    }
  }

  public addInput(answer: Alternative<T>) {
    this.answers.push(answer);
  }

  public getInput(): T {
    return this.answers[0].value;
  }

  public get wasCorrect(): boolean {
    return this.answers.some(answer => this.question.isCorrectAnswer(answer.value));
  }
}
