import { Component } from '@angular/core';

@Component({
  selector: 'app',
  styles: [`${require('!raw!sass!./app.scss')}`],
  template: require('./app.html')
})
export class AppComponent {
  title = 'HDO Quiz';
}
