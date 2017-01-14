import { ChatMessageQuestionComponent, IChatMessage } from '..';
import { Alternative, Question } from '../..';

export class ChatMessageQuestion implements IChatMessage {
  type: any = ChatMessageQuestionComponent;
  resolved: Promise<any>;
  giveAnswer: Function;
  answer: Alternative = null;

  constructor(public question: Question) {
    this.resolved = new Promise(resolve => this.giveAnswer = resolve);
  }

  public resolve(callback: Function): void {
    this.resolved.then(() => callback());
  }
}
