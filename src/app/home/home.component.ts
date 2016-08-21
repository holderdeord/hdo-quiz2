import { Component } from '@angular/core';

import { StackListComponent } from '../stack-list';

@Component({
  selector: 'home',
  providers: [],
  directives: [
    StackListComponent
  ],
  pipes: [],
  styles: [require('./home.css')],
  template: require('./home.html')
})
export class HomeComponent {
  constructor() {
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

}
