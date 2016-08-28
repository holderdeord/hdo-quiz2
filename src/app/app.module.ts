import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { LocalStorageService } from "angular2-localstorage/LocalStorageEmitter";

import { AppComponent }   from './app.component';
import { routing, appRoutingProviders } from './app.routes';
import { StackListComponent } from './stack-list/stack-list.component';
import { StackService } from './shared/stack/stack.service';

import { AboutComponent } from './about';
import { StackComponent } from './stack';
import { ResultComponent } from './result';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        ResultComponent,
        StackListComponent,
        StackComponent
    ],
    providers: [
        appRoutingProviders,
        StackService,
        LocalStorageService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { 
    constructor(storageService: LocalStorageService) {}
}