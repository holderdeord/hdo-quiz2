import { ChatMessageQuestionComponent, IChatMessage } from '..';
import { Question } from '../../question';

export class ChatMessageQuestion implements IChatMessage {
  type: any = ChatMessageQuestionComponent;
  resolved: Promise<any>;
  giveAnswer: Function;

  constructor(public question: Question) {
    this.resolved = new Promise(resolve => this.giveAnswer = resolve);
  }

  public resolve(callback: Function): void {
    this.resolved.then(() => callback());
  }
}
