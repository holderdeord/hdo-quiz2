import { ChatMessageButtonsComponent } from '.';
import { Chat, IChatMessage } from '..';
import { Alternative } from '../..';

export class ChatMessageButtons implements IChatMessage {
  type: any = ChatMessageButtonsComponent;
  resolved: Promise<Alternative<any>>;
  giveAnswer: (answer) => void;
  answer: Alternative<any> = null;

  constructor(public chat: Chat, public alternatives: Alternative<any>[]) {
    this.resolved = new Promise(resolve => this.giveAnswer = resolve);
  }

  public resolve(callback: (answer) => void): void {
    this.resolved.then(answer => callback(answer));
  }
}
