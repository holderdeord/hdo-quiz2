import { Component } from '@angular/core';
import { ChatMessageQuestion } from '.';

@Component({
  selector: 'hdo-chat-question-entry',
  template: require('./chat-question-entry.html')
})
export class ChatMessageQuestionComponent {
  public data: ChatMessageQuestion;

  constructor() {
  }
}
