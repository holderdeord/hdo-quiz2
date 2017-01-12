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
import { LocalStorageService }          from './shared/storage';

import { AboutComponent }               from './about';
import { CardsDirective }               from './cards';
import {
  ChatEntryComponent,
  ChatMessageComponent,
  ChatMessageQuestionComponent,
  ChatMessageTextComponent
}                                       from './shared/chat';
import { HomeComponent }                from './home';
import { MainNavigationComponent }      from './main-navigation';
import { QuizComponent }                from './quiz';
import { QuizListComponent }            from './quiz-list';
import { ResultComponent }              from './result';
import { StackComponent }               from './stack';
import { StackListComponent }           from './stack-list';

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
    ChatMessageQuestionComponent,
    ChatMessageTextComponent,
    CardsDirective,
    HomeComponent,
    MainNavigationComponent,
    QuizComponent,
    QuizListComponent,
    ResultComponent,
    StackComponent,
    StackListComponent
  ],
  entryComponents: [
    ChatEntryComponent,
    ChatMessageComponent,
    ChatMessageQuestionComponent,
    ChatMessageTextComponent
  ],
  providers: [
    appRoutingProviders,
    ChatService,
    ChatUserFactory,
    QuizService,
    LocalStorageService,
    NodeListService,
    {provide: Window, useValue: window}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
  }
}
