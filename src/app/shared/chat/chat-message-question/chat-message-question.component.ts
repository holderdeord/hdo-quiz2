import { Component } from '@angular/core';
import { ChatMessageQuestion } from '..';
import { Alternative } from '../../../shared';

@Component({
  selector: 'hdo-chat-message-question',
  template: require('./chat-question-entry.html')
})
export class ChatMessageQuestionComponent {
  public data: ChatMessageQuestion;

  constructor() {
  }

  answer(answer: Alternative) {
    this.data.answer = answer;
    this.data.giveAnswer();
  }
}
