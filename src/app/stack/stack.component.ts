import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StackService, Stack, StackState } from '../shared/stack';

@Component({
  selector: 'stack',
  styles: [],
  template: require('./stack.html')
})
export class StackComponent {
  public stack: Stack;
  public answeredLastCorrectly: boolean;
  public stackStates = StackState;

  constructor(private route: ActivatedRoute, private service: StackService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      this.service.getStack(id).subscribe(stack => this.stack = stack.startQuiz());
    });
  }

  answer(answer: boolean) {
    this.answeredLastCorrectly = this.stack.giveAnswer(answer);
  }
}
