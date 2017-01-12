import { Component } from '@angular/core';
import { ChatMessageQuestion } from '.';

@Component({
  selector: 'hdo-chat-message-question',
  template: require('./chat-question-entry.html')
})
export class ChatMessageQuestionComponent {
  public data: ChatMessageQuestion;

  constructor() {
  }
}
