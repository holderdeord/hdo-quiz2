import { ChatMessageQuestionComponent } from '.';
import { Chat, IChatMessage } from '..';
import { Alternative, Question } from '../..';

export class ChatMessageQuestion implements IChatMessage {
  type: any = ChatMessageQuestionComponent;
  resolved: Promise<Alternative>;
  giveAnswer: (answer) => void;
  answer: Alternative = null;

  constructor(public chat: Chat, public question: Question) {
    this.resolved = new Promise(resolve => this.giveAnswer = resolve);
  }

  public resolve(callback: (answer) => void): void {
    this.resolved.then(answer => callback(answer));
  }
}
