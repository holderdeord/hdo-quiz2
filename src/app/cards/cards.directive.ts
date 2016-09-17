import {Directive, ElementRef, Output, EventEmitter} from '@angular/core';
import {Stack} from '../shared/swing';

import {NodeListService} from '../shared/node-list';

@Directive({
  selector: '[hdoCards]'
})
export class CardsDirective {
  @Output('throwLeft') throwLeft = new EventEmitter();
  @Output('throwRight') throwRight = new EventEmitter();

  constructor(private el: ElementRef,
              private nodeListService: NodeListService) {
  }

  ngAfterViewInit() {
    const stack = Stack({
      throwOutConfidence: (offset, element) => Math.min(Math.abs(offset) / (element.offsetWidth / 2), 1)
    });
    this.nodeListService.toArray(this.el.nativeElement.childNodes)
      .filter(container => container.nodeName === 'DIV')
      .map(container => this.nodeListService.toArray(container.childNodes)
        .filter(card => card.nodeName === 'DIV' && card.classList.contains('card'))[0]
      )
      .forEach(card => stack.createCard(card));
    stack.on('throwout', event => event.throwDirection > 0 ? this.throwRight.emit(event) : this.throwLeft.emit(event));
  }
}
