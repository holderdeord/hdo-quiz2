import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService, Quiz } from '../shared/quiz';
import { Chat, ChatUser, ChatUserFactory } from '../shared/chat';
import {
  TManuscript,
  IManuscriptEntryMultipleTexts,
  IManuscriptEntryMultipleAlternativeEntry,
  TManuscriptItem,
  Response,
  StringTools,
  RandomSpecialAlternatives
} from '../shared';
import { QuestionFactory } from '../shared/question';
import { Alternative } from "../shared/alternative/alternative.class";
import { ManuscriptEntryType } from '../shared/manuscript-entry';
import { TManuscriptRandomItem } from "../shared/manuscript/manuscript.types";
import { HttpErrorResponseData } from "../shared/httpResponse/httpResponse.types";
import IPromise = Q.IPromise;

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
    this.route.params.subscribe(params => this.activate(params['id']));
  }

  private activate(manuscriptUrl: string) {
    this.responder = this.chatUserFactory.createAnonymousUser();
    this.chat = new Chat(this.responder);
    this.chat.events.subscribe(() => this.scrollToBottom());
    this.quizMaster = this.chatUserFactory.createSystemUser();
    this.chat.addParticipant(this.quizMaster);
    return this.getManuscript(manuscriptUrl)
      .then(manuscript => this.parseManuscript(manuscript, manuscript.items));
  }

  private parseManuscript(manuscript: TManuscript, items: TManuscriptItem[]): Promise<any> {
    if (items.length === 0) {
      return new Promise(resolve => resolve());
    }
    const currentEntry = items.shift();
    return this.parseManuscriptEntry(manuscript, currentEntry)
      .then(() => this.parseManuscript(manuscript, items));
  }

  private parseManuscriptEntry(manuscript: TManuscript, entry: TManuscriptItem): Promise<any> {
    let promise;
    switch (entry.type) {
      case ManuscriptEntryType.button:
        promise = this.chat.addButton(this.responder, entry.text);
        break;
      case ManuscriptEntryType.electoralGuide:
        promise = this.chat.addMessage(this.responder, entry.text);
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
      case ManuscriptEntryType.promises:
        this.chat.setImages(manuscript.images);
        const promiseQuestions = manuscript.promises.map(promise => this.questionFactory.createQuestionFromPromise(promise.body, promise.status === 'fulfilled'));
        promise = this.chat.askSingleSelectQuestions(this.quizMaster, this.responder, promiseQuestions)
          .then((responses: Response<boolean>[]) => {
            const numberOfCorrectAnswers = responses.filter(response => response.wasCorrect).length;
            return this.chat.addMessage(this.quizMaster, `Du fikk ${numberOfCorrectAnswers} av ${responses.length} riktige!`);
          });
        break;
      case ManuscriptEntryType.random:
        const randomQuestions = this.questionFactory.createQuestionsFromRandom(manuscript.random);
        promise = this.chat.askRandomQuestions(this.quizMaster, this.responder, randomQuestions, manuscript.random)
          .then((response: Response<TManuscriptRandomItem>) => {
            let responseValue = response.answers[0].value;
            let urlToGet = responseValue.id === RandomSpecialAlternatives.NoneAreInteresting ?
              manuscript.random.links.next :
              responseValue.links ?
                responseValue.links.next :
                manuscript.random.links.next;
            return this.getManuscript(urlToGet);
          });
        break;
      case ManuscriptEntryType.text:
        promise = this.chat.addMessage(this.quizMaster, entry.text);
        break;
      default:
        console.log('Håndterer ikke typen enda', entry.type);
        promise = new Promise(resolve => resolve());
    }
    return promise;
  }

  private askMultipleQuestions(texts: IManuscriptEntryMultipleTexts, alternatives: IManuscriptEntryMultipleAlternativeEntry[], response?: Response<number>): Promise<Response<number>> {
    const questionText = response ? StringTools.interpolate(texts.followup, {
        answers: response.answers.map(answer => answer.text).join(', ')
      }) : texts.introduction;
    const question = this.questionFactory.createQuestionFromMultiple(questionText, alternatives);
    question.addAlternative(new Alternative(-1, response ? texts.finishButton : texts.cancelButton));
    return this.chat.askMultipleSelectQuestion(this.quizMaster, this.responder, question, response)
      .then((response: Response<number>) => {
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

  private getManuscript(manuscriptUrl, waitTime = [10, 20, 30, 60, 120, 240, 600]): Promise<TManuscript> {
    return this.service.getManuscript(manuscriptUrl)
      .then(manuscript => this.parseManuscript(manuscript, manuscript.items))
      .catch((error: HttpErrorResponseData) => {
        // console.warn(error);
        let timeUntilNextReload = waitTime.length > 1 ? waitTime.shift() : waitTime[0];
        const reloadManuscriptQuestion = this.questionFactory.createReloadManuscriptQuestion(timeUntilNextReload);
        return new Promise(resolve => {
          const timeoutHandleId = setTimeout(() => {
            this.chat.removeLastEntry();
            this.getManuscript(manuscriptUrl, waitTime)
              .then(manuscript => resolve(manuscript))
          }, timeUntilNextReload * 1000);
          this.chat.askOpenQuestion(this.quizMaster, this.responder, reloadManuscriptQuestion)
            .then(() => clearTimeout(timeoutHandleId))
            .then(() => this.getManuscript(manuscriptUrl))
            .then(manuscript => resolve(manuscript));
        });
      });
  }

  private scrollToBottom() {
    return setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }, 100);
  }
}
