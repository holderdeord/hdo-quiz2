import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

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
        this.chat.events.subscribe(() => this.scrollToBottom());
        this.quizMaster = this.chatUserFactory.createSystemUser();
        this.chat.addParticipant(this.quizMaster);
        return this.parseManuscript(manuscript.script);
        // this.chat.addMessages(this.quizMaster, manuscript.introduction, 0)
        //   .then(() => this.chat.addQuestion(this.quizMaster, this.responder, this.questionFactory.createQuestionFromPromise('#1', true)))
        //   .then(() => this.chat.addQuestion(this.quizMaster, this.responder, this.questionFactory.createQuestionFromPromise('#2', true)))
        //   .then(() => this.chat.addMessage(this.quizMaster, 'Du er ferdig!'));
      });
    });
  }

  private parseManuscript(script: any[]): Promise<any> {
    if (script.length === 0) {
      return new Promise(resolve => resolve());
    }
    const currentEntry = script.shift();
    return this.parseManuscriptEntry(currentEntry)
      .then(() => this.parseManuscript(script));
  }

  private parseManuscriptEntry(entry: any): Promise<any> {
    let promise;
    switch (entry.type) {
      case 'button':
        promise = this.chat.addButton(this.responder, entry.text);
        break;
      case 'promises':
        promise = this.parsePromises(entry.promises);
        break;
      case 'text':
        promise = this.chat.addMessage(this.quizMaster, entry.text);
        break;
      default:
        console.log('Håndterer ikke typen enda', entry.type);
        promise = new Promise(resolve => resolve());
    }
    return promise;
  }

  private parsePromises(promises: any[]): Promise<any> {
    if (promises.length === 0) {
      return new Promise(resolve => resolve());
    }
    const currentPromise = promises.shift();
    return this.parsePromisesEntry(currentPromise)
      .then(() => this.parsePromises(promises));
  }

  private parsePromisesEntry(promise: any): Promise<any> {
    const question = this.questionFactory.createQuestionFromPromise(promise.body, promise.kept);
    return this.chat.addQuestion(this.quizMaster, this.responder, question);
  }

  private scrollToBottom() {
    return setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }, 100);
  }
}
