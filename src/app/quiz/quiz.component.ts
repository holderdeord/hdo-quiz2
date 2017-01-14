import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService, Quiz } from '../shared/quiz';
import { Chat, ChatUser, ChatUserFactory } from '../shared/chat';
import { QuestionFactory } from '../shared/question';

@Component({
  selector: 'hdo-quiz',
  styles: [`${require('!raw!sass!./quiz.scss')}`],
  template: require('./quiz.html')
})
export class QuizComponent {
  public responses: boolean[];
  public stack: Quiz;
  public chat: Chat;
  public responder: ChatUser;
  public quizMaster: ChatUser;

  constructor(private route: ActivatedRoute,
              private service: QuizService,
              private chatUserFactory: ChatUserFactory,
              private questionFactory: QuestionFactory) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id: string = params['id'];
      this.service.getManuscript(id).subscribe(manuscript => {
        this.responder = this.chatUserFactory.createAnonymousUser();
        this.chat = new Chat(this.responder);
        this.quizMaster = this.chatUserFactory.createSystemUser();
        this.chat.addParticipant(this.quizMaster);
        this.chat.addMessages(this.quizMaster, manuscript.introduction, 0)
          .then(() => this.chat.addQuestion(this.quizMaster, this.responder, this.questionFactory.createPromiseQuestion('#1', true)))
          .then(() => this.chat.addQuestion(this.quizMaster, this.responder, this.questionFactory.createPromiseQuestion('#2', true)))
          .then(() => this.chat.addMessage(this.quizMaster, 'Du er ferdig!'));
      });
    });
  }
}
