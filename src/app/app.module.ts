import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing,
    appRoutingProviders } from './app.routes';
import { StackListComponent } from './stack-list/stack-list.component';
import { HttpModule }     from '@angular/http';
import { StackService } from './shared/stack/stack.service';
import { StackComponent } from './stack';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        StackListComponent,
        StackComponent
    ],
    providers: [
        appRoutingProviders,
        StackService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }