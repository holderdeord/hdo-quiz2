import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { HttpModule }                   from '@angular/http';

import { AppComponent }                 from './app.component';
import { routing, appRoutingProviders } from './app.routes';

import {
  ChatService,
  ChatUserFactory
}                                       from './shared/chat';
import { NodeListService }              from './shared/node-list';
import { QuizService }                  from './shared/quiz';
import { LocalStorageService }          from './shared/local-storage';

import { AboutComponent }               from './about';
import { CardsDirective }               from './cards';
import {
  ChatEntryComponent,
  ChatMessageComponent,
  ChatMessageAnswerComponent,
  ChatMessageButtonsComponent,
  ChatMessageQuestionComponent,
  ChatMessageTextComponent
}                                       from './shared/chat';
import {
  QuestionFactory
}                                       from './shared/question';
import { HomeComponent }                from './home';
import { MainNavigationComponent }      from './main-navigation';
import { QuizComponent }                from './quiz';
import { QuizListComponent }            from './quiz-list';
import { ResultComponent }              from './result';
import { StackComponent }               from './stack';
import { StackListComponent }           from './stack-list';
import { StartComponent } from "./start/start.component";
import { HdoCategoryService } from "./shared/hdo-category/hdo-category.service";
import { RandomService } from "./shared/random/random.service";
import { VoterGuideService } from "./shared/voter-guide/voter-guide.service";

@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    ChatEntryComponent,
    ChatMessageComponent,
    ChatMessageAnswerComponent,
    ChatMessageButtonsComponent,
    ChatMessageQuestionComponent,
    ChatMessageTextComponent,
    CardsDirective,
    HomeComponent,
    MainNavigationComponent,
    QuizComponent,
    QuizListComponent,
    ResultComponent,
    StackComponent,
    StackListComponent,
    StartComponent
  ],
  entryComponents: [
    ChatEntryComponent,
    ChatMessageComponent,
    ChatMessageAnswerComponent,
    ChatMessageButtonsComponent,
    ChatMessageQuestionComponent,
    ChatMessageTextComponent
  ],
  providers: [
    appRoutingProviders,
    ChatService,
    ChatUserFactory,
    HdoCategoryService,
    LocalStorageService,
    NodeListService,
    QuestionFactory,
    QuizService,
    RandomService,
    VoterGuideService,
    {provide: Window, useValue: window}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
  }
}
