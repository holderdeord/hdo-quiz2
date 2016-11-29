import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {StackService, Stack, StackState} from '../shared/stack';
import {LocalStorageService} from '../shared/storage';

@Component({
  selector: 'quiz',
  styles: [``+require('!raw!sass!./quiz.scss')],
  template: require('./quiz.html')
})
export class QuizComponent {
  private _responses: boolean[];
  public stack: Stack;

  constructor(private route: ActivatedRoute,
              private service: StackService,
              private router: Router,
              private storageService: LocalStorageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      this._responses = params['responses'] ?
        params['responses'].split('').map(response => response === '1') :
        [];
      this.service.getStack(id).subscribe(stack => {
        this.stack = stack.startQuiz(this._responses);
      });
    });
  }

  answer(response: boolean) {
  }
}
