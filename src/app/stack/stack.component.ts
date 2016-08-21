import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StackService, Stack } from '../shared/stack';

@Component({
  selector: 'stack',
  styles: [],
  template: require('./stack.html')
})
export class StackComponent {
  public stack: Stack;
  public index: number;

  constructor(private route: ActivatedRoute, private service: StackService) {
    this.index = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      this.service.getStack(id).subscribe(stack => this.stack = stack);
    });
  }

  answer(kept: boolean) {
    console.log(kept);
    if (this.stack.promises.length > this.index + 1) {
      this.index++;
    } else {
      console.log('done');
    }
  }
}
