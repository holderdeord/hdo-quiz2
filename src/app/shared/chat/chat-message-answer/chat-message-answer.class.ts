import { ChatMessageAnswerComponent } from '.';
import { IChatMessage } from '..';

export class ChatMessageAnswer implements IChatMessage {
  type: any = ChatMessageAnswerComponent;

  constructor(public wasCorrect: boolean, public imageUrl: string) {
  }

  public resolve(callback: () => void): void {
    callback();
  }

  public toText() {
    return null;
  }
}
