import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Quiz } from '../shared/quiz';
import { Chat, ChatUser, ChatUserFactory } from '../shared/chat';
import { QuestionFactory } from '../shared/question';
import { Manuscript } from "../shared/manuscript/manuscript.class";
import { LocalStorageService } from "../shared/local-storage/local-storage.service";
import { LocalStorage } from "../shared/local-storage/local-storage.class";
import { TChatLog } from "../shared/chat/chat.types";
import { VoterGuideFactory } from "../shared/voter-guide/voter-guide.factory";

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
  public chatLocalStorage: LocalStorage;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private route: ActivatedRoute,
              private chatUserFactory: ChatUserFactory,
              private questionFactory: QuestionFactory,
              private router: Router,
              private localStorageService: LocalStorageService,
              private voterGuideFactory: VoterGuideFactory) {
  }

  ngOnInit() {
    this.chatLocalStorage = this.localStorageService.setupStorage('chat');
    this.route.params.subscribe(params => this.activate(params['id']));
  }

  private activate(manuscriptUrl: string): any {
    this.responder = this.chatUserFactory.createAnonymousUser();
    this.chat = new Chat(this.responder);
    this.chat.events.subscribe(() => this.scrollToBottom());
    this.bot = this.chatUserFactory.createSystemUser();
    this.chat.addParticipant(this.bot);
    const oldChat: TChatLog = this.chatLocalStorage.get();
    if (oldChat) {
      oldChat.entries.forEach(entry => this.chat.addMessage(entry.bot ? this.bot : this.responder, entry.text, 0));
    }
    const manuscriptId = parseInt(manuscriptUrl, 10);
    this.voterGuideFactory.create(manuscriptId)
      .then(voterGuide => new Manuscript(voterGuide.manuscript, this.questionFactory, this.chat, this.bot, this.responder, voterGuide))
      .then(manuscript => manuscript.done)
      .then(manuscript => {
        const nextManuscriptUrl = manuscript.getNextManuscriptUrl();
        if (!nextManuscriptUrl) {
          return this.chat.addMessage(this.bot, `
          Beklager, vi gikk tom for ting å si =/ 
          (Dette skal egentlig ikke skje, så gi oss gjerne beskjed)
          <a href="/">Tilbake til start</a>
          `)
        }
        this.chatLocalStorage.set(this.chat.toJson());
        return this.router.navigateByUrl(`/quiz/${nextManuscriptUrl}`);
      });
  }

  // private getManuscript(manuscriptUrl: string, waitTime = [10, 20, 30, 60, 120, 240, 600]): Promise<Manuscript> {
  //   return this.service.getManuscript(manuscriptUrl)
  //     .then(data => new Manuscript(data, this.questionFactory, this.chat, this.bot, this.responder,
  //       this.hdoCategoryService, this.voterGuideFactory))
  //     .catch((error: HttpErrorResponseData) => {
  //       console.warn(error);
  //       let timeUntilNextReload = waitTime.length > 1 ? waitTime.shift() : waitTime[0];
  //       const reloadManuscriptQuestion = this.questionFactory.createReloadManuscriptQuestion(timeUntilNextReload);
  //       return new Promise(resolve => {
  //         const timeoutHandleId = setTimeout(() => {
  //           this.chat.removeLastEntry();
  //           this.getManuscript(manuscriptUrl, waitTime)
  //             .then(manuscript => resolve(manuscript))
  //         }, timeUntilNextReload * 1000);
  //         this.chat.askOpenQuestion(this.bot, this.responder, reloadManuscriptQuestion)
  //           .then(() => clearTimeout(timeoutHandleId))
  //           .then(() => this.getManuscript(manuscriptUrl))
  //           .then(manuscript => resolve(manuscript));
  //       });
  //     });
  // }

  private scrollToBottom() {
    return setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }, 100);
  }
}
