import { Component } from '@angular/core';

import { StackService } from '../shared/stack/stack.service';
import { Stack, StackState } from '../shared/stack';
import { LocalStorageService } from '../shared/storage';

@Component({
  selector: 'hdo-stack-list',
  template: require('./stack-list.html')
})
export class StackListComponent {
  public stacks: Stack[];
  public stackStates = StackState;

  constructor(
    private service: StackService,
    private storageService: LocalStorageService) {
  }

  ngOnInit() {
    let storage = this.storageService.setupStorage('stacks', {});
    this.service.getStacks().subscribe(stacks => {
      stacks
        .filter(stack => !!storage()[stack.id])
        .forEach(stack => stack.startQuiz(storage()[stack.id]));
      this.stacks = stacks;
    });
  }
}
