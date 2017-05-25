import { Component } from '@angular/core';
import { Quiz, QuizState, QuizService } from '../shared/quiz';
import { LocalStorageService } from '../shared';

@Component({
  selector: 'hdo-stack-list',
  template: require('./stack-list.html')
})
export class StackListComponent {
  public stacks: Quiz[];
  public stackStates = QuizState;

  constructor(
    private service: QuizService,
    private storageService: LocalStorageService) {
  }

  ngOnInit() {
    let storage = this.storageService.setupStorage('stacks', {});
    this.service.getStacks().subscribe(stacks => {
      stacks
        .filter(stack => !!storage.get(stack.id))
        .forEach(stack => stack.start(storage.get(stack.id)));
      this.stacks = stacks;
    });
  }
}
