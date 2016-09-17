import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {StackService, Stack, StackState} from '../shared/stack';
import {LocalStorageService} from '../shared/storage';

@Component({
  selector: 'stack',
  styles: [``+require('!raw!sass!./stack.scss')],
  template: require('./stack.html')
})
export class StackComponent {
  public stack: Stack;
  public answeredLastCorrectly: boolean;
  public stackStates = StackState;
  private _storage: Function;
  private _responses: boolean[];

  constructor(private route: ActivatedRoute,
              private service: StackService,
              private router: Router,
              private storageService: LocalStorageService) {
    this._storage = this.storageService.setupStorage('stacks', {});
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
    this.answeredLastCorrectly = this.stack.setResponse(response);
    this._responses.push(response);
    this._storage(this.stack.id, this._responses);
    if (this.stack.state === StackState.Complete) {
      this.router.navigate(['/result', this.stack.id, this.stack.getResponsesAsString()]);
    }
  }
}
