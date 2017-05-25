import { Alternative, Question } from '../..';
import { TChatResponseLinks } from "./chat-response.types";

export class ChatResponse<T> {
  public answers: Alternative<T>[] = [];

  constructor(public question: Question<T>, answer?: Alternative<T>, public links?: TChatResponseLinks) {
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
