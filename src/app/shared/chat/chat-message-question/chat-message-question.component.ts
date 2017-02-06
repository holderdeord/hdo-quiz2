import { Component } from '@angular/core';
import { ChatMessageQuestion } from '..';
import { Alternative } from '../../../shared';

@Component({
  selector: 'hdo-chat-message-question',
  styles: [`${require('!raw!sass!./chat-message-question.scss')}`],
  template: require('./chat-message-question.html')
})
export class ChatMessageQuestionComponent {
  public data: ChatMessageQuestion;

  constructor() {
  }

  answer(answer: Alternative) {
    this.data.answer = answer;
    this.data.giveAnswer(answer);
  }
}
