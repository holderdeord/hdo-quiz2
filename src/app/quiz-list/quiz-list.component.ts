import { Component } from '@angular/core';
import {
  IManuscriptsItem,
  QuizService
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
    this.service.getManuscripts().subscribe((manuscriptsItem: IManuscriptsItem[]) => {
      this.quizList = [
        new QuizListItem('introduction', 'Introduksjon (local)'),
        new QuizListItem('parties', 'Partier (local)'),
        ...manuscriptsItem.map(item => new QuizListItem(item.pk, `${item.name} (API)`)),
      ];
    });
  }
}

class QuizListItem {
  constructor(public id: any, public name: string) {}
}