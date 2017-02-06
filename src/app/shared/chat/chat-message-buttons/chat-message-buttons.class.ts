import { ChatMessageButtonsComponent } from '.';
import { Chat, IChatMessage } from '..';
import { Alternative } from '../..';

export class ChatMessageButtons implements IChatMessage {
  type: any = ChatMessageButtonsComponent;
  resolved: Promise<Alternative>;
  giveAnswer: (answer) => void;
  answer: Alternative = null;

  constructor(public chat: Chat, public alternatives: Alternative[]) {
    this.resolved = new Promise(resolve => this.giveAnswer = resolve);
  }

  public resolve(callback: (answer) => void): void {
    this.resolved.then(answer => callback(answer));
  }
}
