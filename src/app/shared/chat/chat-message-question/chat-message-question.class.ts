import { ChatMessageQuestionComponent } from '.';
import { Chat, IChatMessage } from '..';
import { Alternative, Question } from '../..';

export class ChatMessageQuestion implements IChatMessage {
  type: any = ChatMessageQuestionComponent;
  resolved: Promise<Alternative<any>>;
  giveAnswer: (answer) => void;
  answer: Alternative<any> = null;

  constructor(public chat: Chat, public question: Question<any>) {
    this.resolved = new Promise(resolve => this.giveAnswer = resolve);
  }

  public resolve(callback: (answer) => void): void {
    this.resolved.then(answer => callback(answer));
  }

  public toText(): string {
    return this.answer.text;
  }
}
