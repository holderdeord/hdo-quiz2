import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute, 
    private service: StackService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      this.service.getStack(id).subscribe(stack => this.stack = stack.startQuiz());
    });
  }

  answer(answer: boolean) {
    this.answeredLastCorrectly = this.stack.giveAnswer(answer);
    if (this.stack.state === StackState.Complete) {
      this.router.navigate(['/stack', this.stack.id, this.stack.getResponses().map(response => response ? 1 : 0).join('')]);
    }
  }
}
