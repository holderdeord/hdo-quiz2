import { Component } from '@angular/core';
import {
  QuizService,
  TManuscript
} from '../shared';

@Component({
  selector: 'hdo-quiz-list',
  template: require('./quiz-list.html')
})
export class QuizListComponent {
  public quizList: QuizListItem[];

  constructor(private service: QuizService) {
  }

  ngOnInit() {
    this.service.getManuscripts().subscribe((manuscriptsItem: TManuscript[]) => {
      this.quizList = [
        // new QuizListItem('introduction', 'Valgomat (local)'),
        // new QuizListItem('quiz', 'Quiz (local)'),
        // new QuizListItem('parties', 'Partier (local)'),
        ...manuscriptsItem.map(item => new QuizListItem(item.pk, `${item.name} (API)`)),
      ];
    });
  }
}

class QuizListItem {
  constructor(public id: any, public name: string) {}
}