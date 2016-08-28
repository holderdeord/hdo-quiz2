import { Component } from '@angular/core';

import { MainNavigationComponent } from '../main-navigation';

@Component({
  selector: 'about',
  directives: [
    MainNavigationComponent
  ],
  template: require('./about.html')
})
export class AboutComponent {
}
