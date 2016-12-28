import { Component } from '@angular/core';
import { QuizService } from '../shared/quiz/quiz.service';
import { Quiz } from '../shared/quiz';

@Component({
  selector: 'hdo-quiz-list',
  template: require('./quiz-list.html')
})
export class QuizListComponent {
  public quizList: Quiz[];

  constructor(
    private service: QuizService) {
  }

  ngOnInit() {
    this.service.getStacks().subscribe(quizList => this.quizList = quizList);
  }
}
