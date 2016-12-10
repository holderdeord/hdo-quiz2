import {NgModule}       from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}     from '@angular/http';

import {AppComponent}   from './app.component';
import {routing, appRoutingProviders} from './app.routes';

import {ChatService} from './shared/chat';
import {NodeListService} from './shared/node-list';
import {StackService} from './shared/stack';
import {LocalStorageService} from './shared/storage';

import {AboutComponent} from './about';
import {CardsDirective} from './cards';
import {ChatEntryComponent, ChatMessageEntryComponent} from './shared/chat';
import {HomeComponent} from './home';
import {MainNavigationComponent} from './main-navigation';
import {QuizComponent} from './quiz';
import {ResultComponent} from './result';
import {StackComponent} from './stack';
import {StackListComponent} from './stack-list';

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
    ChatMessageEntryComponent,
    CardsDirective,
    HomeComponent,
    MainNavigationComponent,
    QuizComponent,
    ResultComponent,
    StackComponent,
    StackListComponent
  ],
  entryComponents: [
    ChatMessageEntryComponent
  ],
  providers: [
    appRoutingProviders,
    ChatService,
    StackService,
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
