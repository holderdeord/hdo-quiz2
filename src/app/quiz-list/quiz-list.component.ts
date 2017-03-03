import { Component } from '@angular/core';

@Component({
  selector: 'hdo-quiz-list',
  template: require('./quiz-list.html')
})
export class QuizListComponent {
  public quizList: any[];

  constructor() {
  }

  ngOnInit() {
    this.quizList = [
      {id: 'introduction', name: 'Introduksjon'},
      {id: 'parties', name: 'Partier'}
    ];
  }
}
