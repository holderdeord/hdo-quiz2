import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router/router_state';

@Component({
  selector: 'stack',
  styles: [],
  template: `
    <h1>A specific stack</h1>
  `
})
export class Stack {
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('test');
    // this.route.params.subscribe(params => {
    //   console.log('foo', params);
    // });
  }

  asyncDataWithWebpack() {
  }
}
