import { Component } from '@angular/core';
import { LocalStorage } from "angular2-localstorage/WebStorage";

import { StackService } from '../shared/stack/stack.service';
import { Stack, StackState } from '../shared/stack';

@Component({
  selector: 'hdo-stack-list',
  providers: [
    StackService
  ],
  directives: [
  ],
  pipes: [],
  styles: [],
  template: require('./stack-list.html')
})
export class StackListComponent {
  public availableStacks: Stack[];
  public stackStates = StackState;
  @LocalStorage() public stacks: Object = {};

  constructor(private service: StackService) {
  }

  ngOnInit() {
    this.service.getStacks().subscribe(stacks => {
      stacks
        .filter(stack => !!this.stacks[stack.id])
        .forEach(stack => stack.setResponses(this.stacks[stack.id]));
      this.availableStacks = stacks;
    });
  }
}
