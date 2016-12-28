import { Component } from '@angular/core';
import { Quiz, QuizState, QuizService } from '../shared/quiz';
import { LocalStorageService } from '../shared/storage';

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
        .filter(stack => !!storage()[stack.id])
        .forEach(stack => stack.startQuiz(storage()[stack.id]));
      this.stacks = stacks;
    });
  }
}
