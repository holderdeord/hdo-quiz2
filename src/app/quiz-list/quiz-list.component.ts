import { Component } from '@angular/core';
import { StackService } from '../shared/stack/stack.service';
import { Stack } from '../shared/stack';

@Component({
  selector: 'hdo-quiz-list',
  template: require('./quiz-list.html')
})
export class QuizListComponent {
  public quizList: Stack[];

  constructor(
    private service: StackService) {
  }

  ngOnInit() {
    this.service.getStacks().subscribe(quizList => this.quizList = quizList);
  }
}
