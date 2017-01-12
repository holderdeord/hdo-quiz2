import { ChatMessageQuestionComponent, IChatMessage } from '..';
import { Question } from '../../question';

export class ChatMessageQuestion implements IChatMessage {
  type: any = ChatMessageQuestionComponent;

  constructor(public question: Question) {
  }
}
