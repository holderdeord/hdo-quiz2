/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { Home } from './home';
// import { RouterActive } from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [  ],
  // directives: [ RouterActive ],
  directives: [  ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.css')
  ],
  template: `
    <main>test</main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
  `
  // template: `
  //   <main>
  //     <router-outlet></router-outlet>
  //   </main>

  //   <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
  // `
})
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Holder de ord quiz';
  url = 'https://twitter.com/holderdeord';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}