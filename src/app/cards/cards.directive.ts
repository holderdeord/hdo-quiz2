import {Directive, ElementRef} from '@angular/core';
import {Stack} from '../shared/swing';

import {NodeListService} from '../shared/node-list';

@Directive({
  selector: '[hdoCards]'
})
export class CardsDirective {
  constructor(private el: ElementRef,
              private nodeListService: NodeListService) {
  }

  ngAfterViewInit() {
    const stack = Stack();
    this.nodeListService.toArray(this.el.nativeElement.childNodes)
      .filter(card => card.nodeName === 'LI')
      .forEach(card => stack.createCard(card));
    stack.on('dragmove', event => console.log(event));
  }
}
