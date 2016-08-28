import { Component } from '@angular/core';

import { MainNavigationComponent } from '../main-navigation';
import { StackListComponent } from '../stack-list';

@Component({
  selector: 'home',
  directives: [
    MainNavigationComponent,
    StackListComponent
  ],
  template: require('./home.html')
})
export class HomeComponent {
}
