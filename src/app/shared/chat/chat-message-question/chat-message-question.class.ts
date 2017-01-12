import { ChatMessageQuestionComponent, IChatMessage, IChatUser } from '..';
import { Question } from '../../question';

export class ChatMessageQuestion implements IChatMessage {
  messages: string[];
  type: any = ChatMessageQuestionComponent;

  constructor(public question: Question) {
  }
}
