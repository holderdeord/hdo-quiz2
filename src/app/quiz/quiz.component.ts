import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizService, Quiz, QuizState } from '../shared/quiz';
import { Chat, ChatUser, ChatUserFactory } from '../shared/chat';

@Component({
  selector: 'hdo-quiz',
  styles: [`${require('!raw!sass!./quiz.scss')}`],
  template: require('./quiz.html')
})
export class QuizComponent {
  public responses: boolean[];
  public stack: Quiz;
  public entries: any[] = [];
  public chat: Chat;
  public responder: ChatUser;
  public quizMaster: ChatUser;

  constructor(private route: ActivatedRoute,
              private service: QuizService,
              private router: Router,
              private chatUserFactory: ChatUserFactory) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      this.responses = [];
      this.service.getStack(id).subscribe(stack => {
        this.stack = stack.start(this.responses);
      });
    });
    this.responder = this.chatUserFactory.createAnonymousUser();
    this.quizMaster = this.chatUserFactory.createSystemUser();
    this.chat = new Chat(this.responder);
    this.chat.addParticipant(this.quizMaster);
    this.chat.addMessage(this.quizMaster, 'Hello there!', 0)
      .then(() => this.chat.addMessage(this.responder, 'Hello back at ya!'))
      .then(() => this.chat.addMessage(this.responder, 'How about some questions?'))
      .then(() => this.chat.addMessage(this.quizMaster, 'Sure, let me see what I got ^_^'));
  }

  answer(response: boolean) {
    this.stack.setResponse(response);
    this.responses.push(response);
    if (this.stack.state === QuizState.Complete) {
      this.router.navigate(['/result', this.stack.id, this.stack.getResponsesAsString()]);
    }
  }
}
