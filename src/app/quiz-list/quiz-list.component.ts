import { Component } from '@angular/core';
import { QuizService } from '../shared/quiz/quiz.service';
import { Quiz } from '../shared/quiz';

@Component({
  selector: 'hdo-quiz-list',
  template: require('./quiz-list.html')
})
export class QuizListComponent {
  public quizList: any[];

  constructor(private service: QuizService) {
  }

  ngOnInit() {
    this.quizList = [
      {id: 'introduction', name: 'Introduksjon'}
    ];
  }
}
