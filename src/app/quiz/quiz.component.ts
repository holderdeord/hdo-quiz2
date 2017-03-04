import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService, Quiz } from '../shared/quiz';
import { Chat, ChatUser, ChatUserFactory } from '../shared/chat';
import {
  IManuscriptEntryButton,
  IManuscriptEntryMultiple,
  IManuscriptEntryMultipleTexts,
  IManuscriptEntryMultipleAlternativeEntry,
  IManuscriptEntryPromises,
  IManuscriptEntryText,
  Response
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
        const buttonEntry: IManuscriptEntryButton = entry;
        promise = this.chat.addButton(this.responder, buttonEntry.text);
        break;
      case 'multiple':
        const multipleEntry: IManuscriptEntryMultiple = entry;
        promise = this.askMultipleQuestions(multipleEntry.texts, multipleEntry.alternatives)
          .then(response => this.chat.addMessage(this.quizMaster, this.interpolate(multipleEntry.texts.conclusion, {
            answers: response.answers
              .filter(answer => answer.value !== -1)
              .map(answer => answer.text)
              .join(', ')
          })));
        break;
      case 'promises':
        const promisesEntry: IManuscriptEntryPromises = entry;
        this.chat.setImages(promisesEntry.images);
        const questions = promisesEntry.promises.map(promise => this.questionFactory.createQuestionFromPromise(promise.body, promise.kept));
        promise = this.chat.askSingleSelectQuestions(this.quizMaster, this.responder, questions)
          .then((responses: Response[]) => {
            const numberOfCorrectAnswers = responses.filter(response => response.wasCorrect).length;
            return this.chat.addMessage(this.quizMaster, `Du fikk ${numberOfCorrectAnswers} av ${responses.length} riktige!`);
          });
        break;
      case 'text':
        const textEntry: IManuscriptEntryText = entry;
        promise = this.chat.addMessage(this.quizMaster, textEntry.text);
        break;
      default:
        console.log('Håndterer ikke typen enda', entry.type);
        promise = new Promise(resolve => resolve());
    }
    return promise;
  }

  private askMultipleQuestions(texts: IManuscriptEntryMultipleTexts, alternatives: IManuscriptEntryMultipleAlternativeEntry[], response?: Response): Promise<Response> {
    const questionText = response ? this.interpolate(texts.followup, {
        answers: response.answers.map(answer => answer.text).join(', ')
      }) : texts.introduction;
    const question = this.questionFactory.createQuestionFromMultiple(questionText, alternatives);
    if (response) {
      question.addAlternative(new Alternative(-1, texts.finishButton));
    }
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

  private interpolate(template: string, params): string {
    const keys = Object.keys(params);
    const values = Object.values(params);
    return new Function(...keys, `return \`${template}\`;`)(...values);

  }
}
