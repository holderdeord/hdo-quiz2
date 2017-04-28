import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { QuizService, Quiz } from '../shared/quiz';
import { Chat, ChatUser, ChatUserFactory } from '../shared/chat';
import {
  IManuscriptEntryMultipleTexts,
  IManuscriptEntryMultipleAlternativeEntry,
  IManuscript,
  IManuscriptItem,
  Response,
  StringTools,
  RandomSpecialAlternatives
} from '../shared';
import { QuestionFactory } from '../shared/question';
import { Alternative } from "../shared/alternative/alternative.class";

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
    this.route.params.subscribe(params => this.loadManuscriptUrl(params['id'])
      .then(manuscript => this.activate(manuscript)));
  }

  private loadManuscriptUrl(url): Promise<IManuscript> {
    const id = parseInt(url, 10);
    return new Promise(resolve => {
      if (isNaN(id)) {
        this.service.getManuscript(url).subscribe(manuscript => resolve(manuscript));
      } else {
        return this.service.getManuscriptById(id).subscribe(manuscript => resolve(manuscript));
      }
    });
  }

  private activate(manuscript: IManuscript) {
    this.responder = this.chatUserFactory.createAnonymousUser();
    this.chat = new Chat(this.responder);
    this.chat.events.subscribe(() => this.scrollToBottom());
    this.quizMaster = this.chatUserFactory.createSystemUser();
    this.chat.addParticipant(this.quizMaster);
    return this.parseManuscript(manuscript, manuscript.items);
    // this.chat.addMessages(this.quizMaster, manuscript.introduction, 0)
    //   .then(() => this.chat.addQuestion(this.quizMaster, this.responder, this.questionFactory.createQuestionFromPromise('#1', true)))
    //   .then(() => this.chat.addQuestion(this.quizMaster, this.responder, this.questionFactory.createQuestionFromPromise('#2', true)))
    //   .then(() => this.chat.addMessage(this.quizMaster, 'Du er ferdig!'));
  }

  private parseManuscript(manuscript: IManuscript, items: IManuscriptItem[]): Promise<any> {
    if (items.length === 0) {
      return new Promise(resolve => resolve());
    }
    const currentEntry = items.shift();
    return this.parseManuscriptEntry(manuscript, currentEntry)
      .then(() => this.parseManuscript(manuscript, items));
  }

  private parseManuscriptEntry(manuscript: IManuscript, entry: IManuscriptItem): Promise<any> {
    let promise;
    switch (entry.type) {
      case 'button':
        promise = this.chat.addButton(this.responder, entry.text);
        break;
      // case 'multiple':
      //   const multipleEntry: IManuscriptEntryMultiple = entry;
      //   promise = this.askMultipleQuestions(multipleEntry.texts, multipleEntry.alternatives)
      //     .then(response => response.answers.length > 0 ?
      //       this.chat.addMessage(this.quizMaster, StringTools.interpolate(multipleEntry.texts.conclusion, {
      //         answers: response.answers
      //           .filter(answer => answer.value !== -1)
      //           .map(answer => answer.text)
      //           .join(', ')
      //       })) :
      //       this.chat.addMessage(this.quizMaster, multipleEntry.texts.cancelConclusion));
      //   break;
      case 'promises':
        this.chat.setImages(manuscript.images);
        const promiseQuestions = manuscript.promises.map(promise => this.questionFactory.createQuestionFromPromise(promise.body, promise.status === 'fulfilled'));
        promise = this.chat.askSingleSelectQuestions(this.quizMaster, this.responder, promiseQuestions)
          .then((responses: Response[]) => {
            const numberOfCorrectAnswers = responses.filter(response => response.wasCorrect).length;
            return this.chat.addMessage(this.quizMaster, `Du fikk ${numberOfCorrectAnswers} av ${responses.length} riktige!`);
          });
        break;
      case 'random':
        const randomQuestions = this.questionFactory.createQuestionsFromRandom(manuscript.random);
        promise = this.chat.askRandomQuestions(this.quizMaster, this.responder, randomQuestions)
          .then((response: Response) => {
            console.log(response);
            return this.loadManuscriptUrl(response.answers[0].value)
              .then(manuscript => this.parseManuscript(manuscript, manuscript.items))
          });
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

  private askMultipleQuestions(texts: IManuscriptEntryMultipleTexts, alternatives: IManuscriptEntryMultipleAlternativeEntry[], response?: Response): Promise<Response> {
    const questionText = response ? StringTools.interpolate(texts.followup, {
        answers: response.answers.map(answer => answer.text).join(', ')
      }) : texts.introduction;
    const question = this.questionFactory.createQuestionFromMultiple(questionText, alternatives);
    question.addAlternative(new Alternative(-1, response ? texts.finishButton : texts.cancelButton));
    return this.chat.askMultipleSelectQuestion(this.quizMaster, this.responder, question, response)
      .then(response => {
        const answersValues = response.answers.map(answer => answer.value);
        if (answersValues.some(value => value === -1)) {
          return response;
        }
        const newAlternatives = alternatives.filter(alternative => answersValues.indexOf(alternative.id) === -1);
        if (newAlternatives.length === 0) {
          return response;
        }
        return this.askMultipleQuestions(texts, newAlternatives, response);
      });
  }

  private scrollToBottom() {
    return setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }, 100);
  }
}
