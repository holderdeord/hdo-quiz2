import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StackService, Stack, StackState } from '../shared/stack';
import { LocalStorage } from "angular2-localstorage/WebStorage";

@Component({
  selector: 'stack',
  styles: [],
  template: require('./stack.html')
})
export class StackComponent {
  public stack: Stack;
  public answeredLastCorrectly: boolean;
  public stackStates = StackState;
  @LocalStorage() public stacks:Object = {};

  constructor(
    private route: ActivatedRoute, 
    private service: StackService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      this.stacks[id] = params['responses'] ? this.stacks[id] : [];
      this.service.getStack(id).subscribe(stack => this.stack = stack.startQuiz(this.stacks[id]));
    });
  }

  answer(response: boolean) {
    this.answeredLastCorrectly = this.stack.setResponse(response);
    this.stacks[this.stack.id].push(response);
    if (this.stack.state === StackState.Complete) {
      this.router.navigate(['/result', this.stack.id, this.stack.getResponsesAsString()]);
    }
  }
}
