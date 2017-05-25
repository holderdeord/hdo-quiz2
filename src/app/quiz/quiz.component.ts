import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizService, Quiz } from '../shared/quiz';
import { Chat, ChatUser, ChatUserFactory } from '../shared/chat';
import {
  TManuscript,
  IManuscriptEntryMultipleTexts,
  IManuscriptEntryMultipleAlternativeEntry,
  TManuscriptItem,
  ChatResponse,
  StringTools,
  RandomSpecialAlternatives
} from '../shared';
import { QuestionFactory } from '../shared/question';
import { Alternative } from "../shared/alternative/alternative.class";
import { ManuscriptEntryType } from '../shared/manuscript-entry';
import { TManuscriptRandomItem } from "../shared/manuscript/manuscript.types";
import { HttpErrorResponseData } from "../shared/httpResponse/httpResponse.types";
import IPromise = Q.IPromise;
import { Manuscript } from "../shared/manuscript/manuscript.class";

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
  public bot: ChatUser;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private route: ActivatedRoute,
              private service: QuizService,
              private chatUserFactory: ChatUserFactory,
              private questionFactory: QuestionFactory,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.activate(params['id']));
  }

  private activate(manuscriptUrl: string): any {
    this.responder = this.chatUserFactory.createAnonymousUser();
    this.chat = new Chat(this.responder);
    this.chat.events.subscribe(() => this.scrollToBottom());
    this.bot = this.chatUserFactory.createSystemUser();
    this.chat.addParticipant(this.bot);
    return this.getManuscript(manuscriptUrl, (manuscript: Manuscript, nextManuscriptUrl: string) => {
      if (!nextManuscriptUrl) {
        return console.warn('No next manuscript available');
      }
      console.log('done', manuscript);
      return this.router.navigateByUrl(`/quiz/${nextManuscriptUrl}`);
    });
    // .then(manuscript => {
    //   if (manuscript) {
    //     return this.parseManuscript(manuscript, manuscript.items)
    //   }
    // });
  }

  // private parseManuscript(manuscript: TManuscript, items: TManuscriptItem[]): Promise<any> {
  //   if (!items || items.length === 0) {
  //     return new Promise(resolve => resolve());
  //   }
  //   const currentEntry = items.shift();
  //   return this.parseManuscriptEntry(manuscript, currentEntry)
  //     .then((response) => {
  //       if (typeof response === 'string') {
  //         return this.router.navigateByUrl(`/quiz/${response}`);
  //       }
  //       return this.parseManuscript(manuscript, items)
  //     });
  // }

  // private parseManuscriptEntry(manuscript: TManuscript, entry: TManuscriptItem): Promise<any> {
  //   let promise;
  //   switch (entry.type) {
  //     case ManuscriptEntryType.button:
  //       promise = this.chat.addButton(this.responder, entry.text);
  //       break;
  //     case ManuscriptEntryType.electoralGuide:
  //       promise = this.chat.addMessage(this.responder, entry.text);
  //       break;
  //     // case 'multiple':
  //     //   const multipleEntry: IManuscriptEntryMultiple = entry;
  //     //   promise = this.askMultipleQuestions(multipleEntry.texts, multipleEntry.alternatives)
  //     //     .then(response => response.answers.length > 0 ?
  //     //       this.chat.addMessage(this.bot, StringTools.interpolate(multipleEntry.texts.conclusion, {
  //     //         answers: response.answers
  //     //           .filter(answer => answer.value !== -1)
  //     //           .map(answer => answer.text)
  //     //           .join(', ')
  //     //       })) :
  //     //       this.chat.addMessage(this.bot, multipleEntry.texts.cancelConclusion));
  //     //   break;
  //     case ManuscriptEntryType.promises:
  //       this.chat.setImages(manuscript.images);
  //       const promiseQuestions = manuscript.promises.map(promise => this.questionFactory.createQuestionFromPromise(promise.body, promise.status === 'fulfilled'));
  //       promise = this.chat.askSingleSelectQuestions(this.bot, this.responder, promiseQuestions)
  //         .then((responses: ChatResponse<boolean>[]) => {
  //           const numberOfCorrectAnswers = responses.filter(response => response.wasCorrect).length;
  //           return this.chat.addMessage(this.bot, `Du fikk ${numberOfCorrectAnswers} av ${responses.length} riktige!`);
  //         });
  //       break;
  //     case ManuscriptEntryType.random:
  //       const randomQuestion = this.questionFactory.createQuestionsFromRandom(manuscript.random);
  //       promise = this.chat.askRandomQuestions(this.bot, this.responder, [randomQuestion], manuscript.random)
  //         .then((response: ChatResponse<TManuscriptRandomItem>) => {
  //           let responseValue = response.answers[0].value;
  //           let urlToGet = responseValue.id === RandomSpecialAlternatives.NoneAreInteresting ?
  //             manuscript.random.links.next :
  //             responseValue.links ?
  //               responseValue.links.next :
  //               manuscript.random.links.next;
  //           return urlToGet;
  //           // this.router.navigateByUrl(`/quiz/${urlToGet}`);
  //           // return this.getManuscript(urlToGet);
  //         });
  //       break;
  //     case ManuscriptEntryType.text:
  //       promise = this.chat.addMessage(this.bot, entry.text);
  //       break;
  //     default:
  //       console.log('Håndterer ikke typen enda', entry.type);
  //       promise = new Promise(resolve => resolve());
  //   }
  //   return promise;
  // }

  // private askMultipleQuestions(texts: IManuscriptEntryMultipleTexts, alternatives: IManuscriptEntryMultipleAlternativeEntry[], response?: ChatResponse<number>): Promise<ChatResponse<number>> {
  //   const questionText = response ? StringTools.interpolate(texts.followup, {
  //     answers: response.answers.map(answer => answer.text).join(', ')
  //   }) : texts.introduction;
  //   const question = this.questionFactory.createQuestionFromMultiple(questionText, alternatives);
  //   question.addAlternative(new Alternative(-1, response ? texts.finishButton : texts.cancelButton));
  //   return this.chat.askMultipleSelectQuestion(this.bot, this.responder, question, response)
  //     .then((response: ChatResponse<number>) => {
  //       const answersValues = response.answers.map(answer => answer.value);
  //       if (answersValues.some(value => value === -1)) {
  //         return response;
  //       }
  //       const newAlternatives = alternatives.filter(alternative => answersValues.indexOf(alternative.id) === -1);
  //       if (newAlternatives.length === 0) {
  //         return response;
  //       }
  //       return this.askMultipleQuestions(texts, newAlternatives, response);
  //     });
  // }

  private getManuscript(manuscriptUrl, onParsed: Function, waitTime = [10, 20, 30, 60, 120, 240, 600]): Promise<Manuscript> {
    return this.service.getManuscript(manuscriptUrl)
      .then(data => new Manuscript(data, this.questionFactory, this.chat, this.bot, this.responder, onParsed))
      .catch((error: HttpErrorResponseData) => {
        // console.warn(error);
        let timeUntilNextReload = waitTime.length > 1 ? waitTime.shift() : waitTime[0];
        const reloadManuscriptQuestion = this.questionFactory.createReloadManuscriptQuestion(timeUntilNextReload);
        return new Promise(resolve => {
          const timeoutHandleId = setTimeout(() => {
            this.chat.removeLastEntry();
            this.getManuscript(manuscriptUrl, onParsed, waitTime)
              .then(manuscript => resolve(manuscript))
          }, timeUntilNextReload * 1000);
          this.chat.askOpenQuestion(this.bot, this.responder, reloadManuscriptQuestion)
            .then(() => clearTimeout(timeoutHandleId))
            .then(() => this.getManuscript(manuscriptUrl, onParsed))
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
