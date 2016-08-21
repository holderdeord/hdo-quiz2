import { Component } from '@angular/core';

@Component({
  selector: 'about',
  styles: [`
  `],
  template: `
    <h1>About</h1>
  `
})
export class AboutComponent {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
  }
}
