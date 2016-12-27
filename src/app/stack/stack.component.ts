import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {StackService, Stack, StackState} from '../shared/stack';
import {LocalStorageService} from '../shared/storage';
import {SwingStack, SwingCard, ISwingCard} from '../shared/swing';

@Component({
  selector: 'stack',
  styles: [`` + require('!raw!sass!./stack.scss')],
  template: require('./stack.html')
})
export class StackComponent {
  public stack: Stack;
  public swingStack;
  public answeredLastCorrectly: boolean;
  public stackStates = StackState;

  private _storage: Function;
  private _responses: boolean[];
  private _cards: ISwingCard[] = [];

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
    this.swingStack = SwingStack({
      throwOutConfidence: (offset, element) => Math.min(Math.abs(offset) / (element.offsetWidth / 2), 1)
    });
  }

  addCard(index: number, card: ISwingCard) {
    this._cards[index] = card;
  }

  answer(response: boolean) {
    this.answeredLastCorrectly = this.stack.setResponse(response);

    this._responses.push(response);
    this._storage(this.stack.id, this._responses);
    if (this.stack.state === StackState.Complete) {
      this.router.navigate(['/result', this.stack.id, this.stack.getResponsesAsString()]);
    }
  }

  throwLeft() {
    this._cards[this.stack.index].throwOut(SwingCard.DIRECTION_LEFT, 0);
  }

  throwRight() {
    this._cards[this.stack.index].throwOut(SwingCard.DIRECTION_RIGHT, 0);
  }
}
