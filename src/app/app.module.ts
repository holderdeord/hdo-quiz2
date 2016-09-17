import {NgModule}       from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}     from '@angular/http';

import {AppComponent}   from './app.component';
import {routing, appRoutingProviders} from './app.routes';

import {NodeListService} from './shared/node-list';
import {StackService} from './shared/stack';
import {LocalStorageService} from './shared/storage';

import {AboutComponent} from './about';
import {CardsDirective} from './cards';
import {HomeComponent} from './home';
import {MainNavigationComponent} from './main-navigation';
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
    CardsDirective,
    HomeComponent,
    MainNavigationComponent,
    ResultComponent,
    StackComponent,
    StackListComponent
  ],
  providers: [
    appRoutingProviders,
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
