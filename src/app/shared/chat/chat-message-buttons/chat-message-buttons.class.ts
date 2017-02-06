import { ChatMessageButtonsComponent } from '.';
import { IChatMessage } from '..';
import { Alternative } from '../..';

export class ChatMessageButtons implements IChatMessage {
  type: any = ChatMessageButtonsComponent;
  resolved: Promise<any>;
  giveAnswer: Function;
  answer: Alternative = null;

  constructor(public alternatives: Alternative[]) {
    this.resolved = new Promise(resolve => this.giveAnswer = resolve);
  }

  public resolve(callback: Function): void {
    this.resolved.then(() => callback());
  }
}
